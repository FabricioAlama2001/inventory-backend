"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateUserDto = exports.CreateUserDto = void 0;
var openapi = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var CreateUserDto = /** @class */ (function () {
    function CreateUserDto() {
    }
    CreateUserDto._OPENAPI_METADATA_FACTORY = function () {
        return { name: { required: true, type: function () { return String; } }, lastname: { required: true, type: function () { return String; } }, birthdate: { required: true, type: function () { return Date; } }, age: { required: true, type: function () { return Number; } }, married: { required: true, type: function () { return Boolean; } } };
    };
    __decorate([
        (0, class_validator_1.IsString)()
    ], CreateUserDto.prototype, "name");
    __decorate([
        (0, class_validator_1.IsString)()
    ], CreateUserDto.prototype, "lastname");
    __decorate([
        (0, class_validator_1.IsString)()
    ], CreateUserDto.prototype, "birthdate");
    __decorate([
        (0, class_validator_1.IsOptional)()
    ], CreateUserDto.prototype, "age");
    __decorate([
        (0, class_validator_1.IsBoolean)()
    ], CreateUserDto.prototype, "married");
    return CreateUserDto;
}());
exports.CreateUserDto = CreateUserDto;
var UpdateUserDto = /** @class */ (function (_super) {
    __extends(UpdateUserDto, _super);
    function UpdateUserDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpdateUserDto._OPENAPI_METADATA_FACTORY = function () {
        return {};
    };
    return UpdateUserDto;
}((0, swagger_1.PartialType)(CreateUserDto)));
exports.UpdateUserDto = UpdateUserDto;
