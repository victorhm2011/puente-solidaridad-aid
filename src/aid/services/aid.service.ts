import { HttpService } from '@nestjs/axios';
import { Injectable, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { AidExitDto } from '../dto/aidExit.dto';
import { AidEntity } from '../models/aid.entity';
import { Aid } from '../models/aid.interface';

@Injectable()
export class AidService {
    constructor(
        @InjectRepository(AidEntity)
        private readonly aidRepository: Repository<AidEntity>,
        private http: HttpService
    ){}

    async createAid(aid: Aid): Promise<AidExitDto> {
        return this.aidRepository.save(aid);
    }

    getAidsList(): Observable<Aid[]> {
        return from(this.aidRepository.find());
    }

    getAidsByPatientId(patientId: string): Observable<Aid[]> {
        return from(this.aidRepository.find({where: {patientId: patientId}}));
    }

    async getAid(id: string): Promise<AidExitDto> {
        return this.aidRepository.findOne(id);
    }

    async updateAid(id: string, aid: Aid): Promise<UpdateResult> {
        return await this.aidRepository.update(id, aid);
    }
    
    async deleteAid(id: string): Promise<DeleteResult> {
        return this.aidRepository.delete(id);
    }

    async validatePatient(aid: Aid, @Request() req): Promise<any> {
        return this.http.get('https://puente-solidaridad-patients.herokuapp.com/v1/patient/' + aid.patientId, {
            headers: {
                'Authorization': req.headers.authorization,
            }  
        })
        .toPromise()
        .then(res => res.data)
        .catch(err => err); 
    }

    async validatePhysician(aid: Aid, @Request() req): Promise<any> {
        return this.http.get('https://puente-solidaridad-physicians.herokuapp.com/v1/physician/' + aid.physicianId, {
            headers: {
                'Authorization': req.headers.authorization,
            }  
        })
        .toPromise()
        .then(res => res.data)
        .catch(err => err); 
    }

    async validateAid(aid: Aid, @Request() req): Promise<any> {
        return this.http.get('http://localhost:4000/patient/' + aid.patientId + '/physician/' + aid.physicianId + '/' + req.headers.authorization)
        .toPromise()
        .then(res => res.data)
        .catch(err => err); 
    }
}
