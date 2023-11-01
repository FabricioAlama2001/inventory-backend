import {Inject, Injectable} from '@nestjs/common';
import {MailerService} from '@nestjs-modules/mailer';
import {catchError} from 'rxjs';
import {MailSubjectEnum, MailTemplateEnum} from '@shared/enums';
import {ConfigType} from '@nestjs/config';
import {config} from '@config';
import {environments} from '../../../environments';
import {AttachmentInterface} from "../interfaces/attachment.interface";
import {MailDataInterface} from "../interfaces/mail-data.interface";
import {join} from "path";
import {FolderPathsService} from "./folder-paths.service";

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService,
                @Inject(config.KEY) private configService: ConfigType<typeof config>,
                private readonly folderPathsService: FolderPathsService) {
    }

    async sendMail(mailData: MailDataInterface) {
        const mailAttachments = [];

        if (mailData?.attachments) {
            mailData.attachments.forEach(attachment => {
                let data = null;

                if (attachment.file) {
                    data = {
                        content: attachment.file,
                        filename: attachment.filename,
                        contentDisposition: 'attachment',
                    };

                    mailAttachments.push(data);
                }

                if (attachment.path) {
                    data = {
                        path: join(this.folderPathsService.mailTemporaryFiles, attachment.path),
                        filename: attachment.filename,
                        contentDisposition: 'attachment',
                    };

                    mailAttachments.push(data);
                }
            });
        }

        if (mailData?.attachment) {
            let data = null;

            if (mailData.attachment.file) {
                data = {
                    content: mailData.attachment.file,
                    filename: mailData.attachment.filename,
                    contentDisposition: 'attachment',
                };

                mailAttachments.push(data);
            }

            if (mailData.attachment.path) {
                data = {
                    path: join(this.folderPathsService.mailTemporaryFiles, mailData.attachment.path),
                    filename: mailData.attachment.filename,
                    contentDisposition: 'attachment',
                };
                mailAttachments.push(data);
            }
        }

        const header = {
            filename: 'header.jpg',
            path: join(this.folderPathsService.mailImages, 'header.jpg'),
            cid: 'header',
        };

        const footer = {
            filename: 'footer.jpg',
            path: join(this.folderPathsService.mailImages, 'footer.jpg'),
            cid: 'footer',
        };

        mailAttachments.push(header);
        mailAttachments.push(footer);

        const sendMailOptions = {
            to: mailData.to,
            from: `${this.configService.mail.fromName} - ${this.configService.mail.from}`,
            subject: mailData.subject,
            template: mailData.template,
            context: {system: environments.appName,data:mailData.data},
            attachments: mailAttachments,
        };


        return await this.mailerService
            .sendMail(sendMailOptions)
            .then(response => {
                    return {accepted: response.accepted, rejected: response.rejected};
                },
                catchError(error => {
                    return error;
                }),
            );
    }
}
