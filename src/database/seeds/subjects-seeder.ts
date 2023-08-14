import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { faker } from '@faker-js/faker';
import { join } from 'path';
import { SeedSubjectDto } from '@core/dto';
import { CatalogueEntity, CurriculumEntity } from '@core/entities';
import { CataloguesService, CurriculumsService, SubjectRequirementsService, SubjectsService } from '@core/services';
import { CatalogueCoreTypeEnum } from '@shared/enums';

@Injectable()
export class SubjectsSeeder {
  private states: CatalogueEntity[] = [];
  private periods: CatalogueEntity[] = [];
  private types: CatalogueEntity[] = [];
  private curriculums: CurriculumEntity[] = [];

  constructor(
    private subjectService: SubjectsService,
    private subjectRequirementsService: SubjectRequirementsService,
    private catalogueService: CataloguesService,
    private curriculumsService: CurriculumsService,
  ) {}

  async run() {
    await this.loadCatalogues();
    await this.loadCurriculums();
    await this.createSubjects();
    await this.createRequirements();
  }

  async loadCatalogues() {
    const catalogues = (await this.catalogueService.findAll()).data as CatalogueEntity[];

    this.states = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.SUBJECTS_STATE);

    this.periods = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.ACADEMIC_PERIOD);

    this.types = catalogues.filter(catalogue => catalogue.type === CatalogueCoreTypeEnum.SUBJECTS_TYPE);
  }

  async loadCurriculums() {
    this.curriculums = (await this.curriculumsService.findAll()).data as CurriculumEntity[];
  }

  async createSubjects() {
    const subjects: SeedSubjectDto[] = [];

    const stateEnabled = this.states.find((state: CatalogueEntity) => {
      return state.code === 'enable' && state.type === CatalogueCoreTypeEnum.SUBJECTS_STATE;
    });

    //Periodo academico
    const first = this.periods.find((period: CatalogueEntity) => {
      return period.code === '1' && period.type === CatalogueCoreTypeEnum.ACADEMIC_PERIOD;
    });
    const second = this.periods.find((period: CatalogueEntity) => {
      return period.code === '2' && period.type === CatalogueCoreTypeEnum.ACADEMIC_PERIOD;
    });
    const third = this.periods.find((period: CatalogueEntity) => {
      return period.code === '3' && period.type === CatalogueCoreTypeEnum.ACADEMIC_PERIOD;
    });
    const fourth = this.periods.find((period: CatalogueEntity) => {
      return period.code === '4' && period.type === CatalogueCoreTypeEnum.ACADEMIC_PERIOD;
    });
    const fifth = this.periods.find((period: CatalogueEntity) => {
      return period.code === '5' && period.type === CatalogueCoreTypeEnum.ACADEMIC_PERIOD;
    });

    //curriculum
    const curriculum1 = this.curriculums.find((curriculum: CurriculumEntity) => curriculum.code === 'cod1');
    const curriculum2 = this.curriculums.find((curriculum: CurriculumEntity) => curriculum.code === 'cod2');

    //tipo asignatura
    const type = this.types.find(type => {
      return type.code === 'subject' && type.type === CatalogueCoreTypeEnum.SUBJECTS_TYPE;
    });

    subjects.push(
      {
        academicPeriod: first,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code1',
        credits: 10,
        isVisible: true,
        name: faker.company.name(),
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: first,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code2',
        credits: 10,
        isVisible: true,
        name: faker.company.name(),
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: first,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code3',
        credits: 10,
        isVisible: true,
        name: faker.company.name(),
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: first,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code4',
        credits: 10,
        isVisible: true,
        name: faker.company.name(),
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: second,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code5',
        credits: 10,
        isVisible: true,
        name: faker.company.name(),
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: second,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code6',
        credits: 10,
        isVisible: true,
        name: faker.company.name(),
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: second,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code7',
        credits: 10,
        isVisible: true,
        name: faker.company.name(),
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: second,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code8',
        credits: 10,
        isVisible: true,
        name: faker.company.name(),
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: third,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code9',
        credits: 10,
        isVisible: true,
        name: faker.company.name(),
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: third,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code10',
        credits: 10,
        isVisible: true,
        name: faker.company.name(),
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: third,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code11',
        credits: 10,
        isVisible: true,
        name: 'Asignatura11',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: third,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code12',
        credits: 10,
        isVisible: true,
        name: 'Asignatura12',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fourth,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code13',
        credits: 10,
        isVisible: true,
        name: 'Asignatura13',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fourth,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code14',
        credits: 10,
        isVisible: true,
        name: 'Asignatura14',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fourth,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code15',
        credits: 10,
        isVisible: true,
        name: 'Asignatura15',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fourth,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code16',
        credits: 10,
        isVisible: true,
        name: 'Asignatura16',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fifth,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code17',
        credits: 10,
        isVisible: true,
        name: 'Asignatura17',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fifth,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code18',
        credits: 10,
        isVisible: true,
        name: 'Asignatura18',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fifth,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code19',
        credits: 10,
        isVisible: true,
        name: 'Asignatura19',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fifth,
        curriculum: curriculum1,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code20',
        credits: 10,
        isVisible: true,
        name: 'Asignatura20',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: first,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code21',
        credits: 10,
        isVisible: true,
        name: 'Asignatura21',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: first,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code22',
        credits: 10,
        isVisible: true,
        name: 'Asignatura22',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: first,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code23',
        credits: 10,
        isVisible: true,
        name: 'Asignatura23',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: first,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code24',
        credits: 10,
        isVisible: true,
        name: 'Asignatura24',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: second,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code25',
        credits: 10,
        isVisible: true,
        name: 'Asignatura25',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: second,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code26',
        credits: 10,
        isVisible: true,
        name: 'Asignatura26',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: second,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code27',
        credits: 10,
        isVisible: true,
        name: 'Asignatura27',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: second,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code28',
        credits: 10,
        isVisible: true,
        name: 'Asignatura28',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: third,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code29',
        credits: 10,
        isVisible: true,
        name: 'Asignatura29',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: third,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code30',
        credits: 10,
        isVisible: true,
        name: 'Asignatura30',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: third,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code31',
        credits: 10,
        isVisible: true,
        name: 'Asignatura31',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: third,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code32',
        credits: 10,
        isVisible: true,
        name: 'Asignatura32',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fourth,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code33',
        credits: 10,
        isVisible: true,
        name: 'Asignatura33',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fourth,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code34',
        credits: 10,
        isVisible: true,
        name: 'Asignatura34',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fourth,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code35',
        credits: 10,
        isVisible: true,
        name: 'Asignatura35',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fourth,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code36',
        credits: 10,
        isVisible: true,
        name: 'Asignatura36',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fifth,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code37',
        credits: 10,
        isVisible: true,
        name: 'Asignatura37',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fifth,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code38',
        credits: 10,
        isVisible: true,
        name: 'Asignatura39',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fifth,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code39',
        credits: 10,
        isVisible: true,
        name: 'Asignatura39',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
      {
        academicPeriod: fifth,
        curriculum: curriculum2,
        type: type,
        state: stateEnabled,
        autonomousHour: 10,
        code: 'code40',
        credits: 10,
        isVisible: true,
        name: 'Asignatura40',
        practicalHour: faker.number.int({ min: 20, max: 80 }),
        scale: 1,
        teacherHour: faker.number.int({ min: 20, max: 80 }),
      },
    );

    for (const subject of subjects) {
      await this.subjectService.create(subject);
    }
  }

  async createRequirements() {
    const workbook = XLSX.readFile(join(process.cwd(), 'src/database/seeds/files/subject_requirements.xlsx'));

    const workbookSheets = workbook.SheetNames;
    const sheet = workbookSheets[0];
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    for (const item of dataExcel) {
      const subject = await this.subjectService.findByCode(item['subject_code']);
      const requirement = await this.subjectService.findByCode(item['requirement_code']);
      console.log(subject.code);
      console.log(requirement.code);
      await this.subjectRequirementsService.createPrerequisite({
        subject,
        requirement,
        isEnabled: true,
        type: item['type'],
      });
    }

    return true;
  }
}
