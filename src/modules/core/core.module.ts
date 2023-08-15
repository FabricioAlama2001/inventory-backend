import { Global, Module } from '@nestjs/common';
import {
  CareersController,
  CataloguesController,
  CurriculumsController,
  ImportsController,
  InformationStudentsController,
  InstitutionsController,
  SchoolPeriodsController,
  StudentsController,
  SubjectsController,
  InformationTeachersController,
  EventsController,
  TeachersController,
  ExportsController,
} from '@core/controllers';
import {
  CareersService,
  CataloguesService,
  CurriculumsService,
  InformationStudentsService,
  InstitutionsService,
  SchoolPeriodsService,
  StudentsService,
  SubjectsService,
  InformationTeachersService,
  TeachersService,
  EventsService,
  ImportsService,
  ExportsService,
  LocationsService,
  PartialsService,
  SubjectRequirementsService,
  EnrollmentsDetailService,
  EnrollmentsService,
  ClassroomsService,
  GradesService,
} from '@core/services';
import { DatabaseModule } from '@database';
import { coreProviders } from '@core/providers';

@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [
    CareersController,
    CataloguesController,
    CurriculumsController,
    EventsController,
    ExportsController,
    ImportsController,
    InformationStudentsController,
    InformationTeachersController,
    InstitutionsController,
    SchoolPeriodsController,
    StudentsController,
    SubjectsController,
    TeachersController,
  ],
  providers: [
    ...coreProviders,
    CareersService,
    CataloguesService,
    CurriculumsService,
    EventsService,
    ExportsService,
    ImportsService,
    InformationStudentsService,
    InformationTeachersService,
    InstitutionsService,
    LocationsService,
    PartialsService,
    SchoolPeriodsService,
    StudentsService,
    SubjectsService,
    SubjectRequirementsService,
    TeachersService,
    EnrollmentsDetailService,
    EnrollmentsService,
    ClassroomsService,
    GradesService,
  ],
  exports: [
    ...coreProviders,
    CareersService,
    CataloguesService,
    CurriculumsService,
    EventsService,
    ExportsService,
    ImportsService,
    InformationStudentsService,
    InformationTeachersService,
    InstitutionsService,
    LocationsService,
    PartialsService,
    SchoolPeriodsService,
    StudentsService,
    SubjectsService,
    SubjectRequirementsService,
    TeachersService,
    EnrollmentsDetailService,
    EnrollmentsService,
    ClassroomsService,
    GradesService,
  ],
})
export class CoreModule {}
