import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth, PublicRoute, User } from '@auth/decorators';
import { AuthService } from '@auth/services';
import { UserEntity } from '@auth/entities';
import {
  LoginDto,
  PasswordChangeDto,
  ReadUserDto,
  UpdateProfileDto,
  UpdateUserInformationDto,
} from '@auth/dto';
import { ResponseHttpModel, ServiceResponseHttpModel } from '@shared/models';
import { MailService } from '@common/services';
import { MailSubjectEnum, MailTemplateEnum } from '@shared/enums';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly nodemailerService: MailService,
  ) {}

  @ApiOperation({ summary: 'Login' })
  @PublicRoute()
  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  async login(@Body() payload: LoginDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.authService.login(payload);

    return {
      data: serviceResponse.data,
      message: 'Correct Access',
      title: 'Welcome',
    };
  }

  @ApiOperation({ summary: 'Change Password' })
  @Auth()
  @Put(':id/change-password')
  @HttpCode(HttpStatus.CREATED)
  async changePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: PasswordChangeDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.authService.changePassword(id, payload);

    return {
      data: serviceResponse,
      message: 'The password was changed',
      title: 'Password Changed',
    };
  }

  @ApiOperation({ summary: 'Find Profile' })
  @Auth()
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async findProfile(@User() user: UserEntity): Promise<ResponseHttpModel> {
    const serviceResponse = await this.authService.findProfile(user.id);

    return {
      data: serviceResponse,
      message: `profile`,
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Find User Information' })
  @Auth()
  @Get('user-information')
  @HttpCode(HttpStatus.OK)
  async findUserInformation(
    @User() user: UserEntity,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.authService.findUserInformation(user.id);

    return {
      data: serviceResponse,
      message: 'The user information was updated',
      title: 'User Information Updated',
    };
  }

  @ApiOperation({ summary: 'Update Profile' })
  @Auth()
  @Put('profile')
  @HttpCode(HttpStatus.CREATED)
  async updateProfile(
    @User() user: UserEntity,
    @Body() payload: UpdateProfileDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.authService.updateProfile(
      user.id,
      payload,
    );

    return {
      data: serviceResponse,
      message: 'The profile was updated',
      title: 'Profile Updated',
    };
  }

  @ApiOperation({ summary: 'Update User Information' })
  @Auth()
  @Put('user-information')
  @HttpCode(HttpStatus.CREATED)
  async updateUserInformation(
    @User('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateUserInformationDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.authService.updateUserInformation(
      id,
      payload,
    );

    return {
      data: serviceResponse,
      message: 'The user information was updated',
      title: 'User Information Updated',
    };
  }

  @ApiOperation({ summary: 'Refresh Token' })
  @Auth()
  @Get('refresh-token')
  @HttpCode(HttpStatus.CREATED)
  refreshToken(@User() user: UserEntity) {
    const serviceResponse = this.authService.refreshToken(user);

    return {
      data: serviceResponse.data,
      message: 'Correct Access',
      title: 'Refresh Token',
    };
  }

  @ApiOperation({ summary: 'Send Email' })
  @Get('send-email')
  @HttpCode(HttpStatus.CREATED)
  async sendEmail() {
    const response = await this.nodemailerService.sendMail(
      'ctamyo@gmail.com',
      MailSubjectEnum.RESET_PASSWORD,
      MailTemplateEnum.TEST,
    );

    return {
      data: response,
      message: 'Email Sent',
      title: 'Email',
    };
  }

  @Get('transactional-codes/:username/request')
  @HttpCode(HttpStatus.OK)
  async requestTransactionalCode(
    @Param('username') username: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.authService.requestTransactionalCode(
      username,
    );

    return {
      data: serviceResponse.data,
      message: `Su código fue enviado a ${serviceResponse.data}`,
      title: 'Código Enviado',
    };
  }

  @Get('transactional-codes/:token/verify')
  @HttpCode(HttpStatus.OK)
  async verifyTransactionalCode(
    @Param('token') token: string,
  ): Promise<ResponseHttpModel> {
    await this.authService.verifyTransactionalCode(token);

    return {
      data: null,
      message: `Por favor ingrese su nueva contraseña`,
      title: 'Código Válido',
    };
  }

  @Patch('reset-passwords')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() payload: any): Promise<ResponseHttpModel> {
    await this.authService.resetPassword(payload);

    return {
      data: null,
      message: `Por favor inicie sesión`,
      title: 'Contraseña Reseteada',
    };
  }
}
