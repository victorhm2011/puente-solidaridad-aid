import { Body, Controller, Delete, Get, HttpException, Param, Request, ParseUUIDPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Roles } from '../decorators/roles.decorator';
import { AidEntryDto } from '../dto/aidEntry.dto';
import { AidExitDto } from '../dto/aidExit.dto';
import { AidPatchDto } from '../dto/aidPatch.dto';
import { RolesGuard } from '../guards/roles.guard';
import { Aid } from '../models/aid.interface';
import { Role } from '../models/role.enum';
import { AidService } from '../services/aid.service';
import { errors } from '../constants/constants';

@Controller({version: '1'})
export class AidController {
    constructor(private aidService: AidService) {}

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Post('aid')
    @UsePipes(new ValidationPipe())
    async create(@Body() aid: AidEntryDto, @Request() req): Promise<Aid> {
        const patient = await this.aidService.validatePatient(aid, req);
        const physician = await this.aidService.validatePhysician(aid, req);
        if(!patient.patientId && !aid.patientId){
            throw new NotFoundException(errors.existPatient);
        }
        if(!physician.id && !aid.physicianId){
            throw new NotFoundException(errors.existPhysician);
        }
        return await this.aidService.createAid(aid);
    }

    @Get('aids')
    findAll(): Observable<Aid[]> {
        return this.aidService.getAidsList();
    }

    @Get('aid/:id')
    async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<AidExitDto> {
        const aid = await this.aidService.getAid(id);
        if(!aid){
            throw new NotFoundException(errors.exist);
        }
        return aid;
    }

    @Patch('aid/:id')
    @UsePipes(new ValidationPipe())
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() aid: AidPatchDto,
        @Request() req
    ): Promise<AidExitDto> {
        const aidToUpdate = await this.aidService.getAid(id);
        const patient = await this.aidService.validatePatient(aid, req);
        const physician = await this.aidService.validatePhysician(aid, req);
        if(!aidToUpdate){
            throw new NotFoundException(errors.exist);
        }
        if(!patient.patientId && !aid.patientId){
            throw new NotFoundException(errors.existPatient);
        }
        if(!physician.id && !aid.physicianId){
            throw new NotFoundException(errors.existPhysician);
        }
        await this.aidService.updateAid(id, aid);
        return await this.aidService.getAid(id);
    }
    
    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Delete('aid/:id')
    async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<AidExitDto> {
        const aidToUpdate = await this.aidService.getAid(id);
        if(!aidToUpdate){
            throw new NotFoundException(errors.exist);
        } else {
            await this.aidService.deleteAid(id);
            throw new HttpException(errors.removed, errors.noContent);
        }
    }

    @Get('patient/:id/aid')
    getRelativesByPatientId(@Param('id', new ParseUUIDPipe()) id: string): Observable<Aid[]> {
        return this.aidService.getAidsByPatientId(id);
    }
}
