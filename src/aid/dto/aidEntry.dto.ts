import { IsDateString, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class AidEntryDto {

    @IsString()
    patientId: string;

    @MaxLength(2000)
    @IsString()
    reference: string;

    @MaxLength(2000)
    @IsString()
    diagnosis: string;

    @MaxLength(2000)
    @IsString()
    treatment: string;

    @IsDateString()
    aidDate: Date;

    @IsString()
    physicianId: string;

    @MaxLength(1000)
    @IsString()
    hospital: string;

    @IsOptional()
    @IsNumber()
    input: number;

    @MaxLength(2000)
    @IsString()
    socialConcept: string;

    @MaxLength(2000)
    @IsString()
    socioEcoSituation: string;

    @MaxLength(2000)
    @IsOptional()
    @IsString()
    monthlyIncome: string;

    @MaxLength(1000)
    @IsOptional()
    @IsString()
    socialWorker: string;

    @MaxLength(50)
    @IsString()
    aidType: string;
}
