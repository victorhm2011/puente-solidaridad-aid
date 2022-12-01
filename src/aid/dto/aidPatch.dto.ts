import { IsDateString, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class AidPatchDto {

    @IsOptional()
    @IsString()
    patientId: string;

    @MaxLength(2000)
    @IsString()
    @IsOptional()
    reference: string;

    @MaxLength(2000)
    @IsString()
    @IsOptional()
    diagnosis: string;

    @MaxLength(2000)
    @IsString()
    @IsOptional()
    treatment: string;

    @IsDateString()
    @IsOptional()
    aidDate: Date;

    @IsString()
    @IsOptional()
    physicianId: string;

    @MaxLength(1000)
    @IsString()
    @IsOptional()
    hospital: string;

    @IsOptional()
    @IsNumber()
    @IsOptional()
    input: number;

    @MaxLength(2000)
    @IsString()
    @IsOptional()
    socialConcept: string;

    @MaxLength(2000)
    @IsString()
    @IsOptional()
    socioEcoSituation: string;

    @MaxLength(2000)
    @IsString()
    @IsOptional()
    monthlyIncome: string;

    @MaxLength(1000)
    @IsString()
    @IsOptional()
    socialWorker: string;

    @MaxLength(50)
    @IsString()
    @IsOptional()
    aidType: string;
}
