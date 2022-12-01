import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('aid')
export class AidEntity {
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id: string;

    @Column({ default: null, name: "patient_id" })
    patientId: string;

    @Column({ default: null, name: "reference" })
    reference: string;

    @Column({ default: null, name: "diagnosis" })
    diagnosis: string;

    @Column({ default: null, name: "treatment" })
    treatment: string;

    @Column({ type: 'date', default: null, name: "aid_date" })
    aidDate: Date;

    @Column({ default: null, name: "physician_id" })
    physicianId: string;

    @Column({ default: null, name: "hospital" })
    hospital: string;

    @Column({ default: null, name: "input" })
    input: number;

    @Column({ default: null, name: "social_concept" })
    socialConcept: string;

    @Column({ default: null, name: "socio_eco_situation" })
    socioEcoSituation: string;

    @Column({ default: null, name: "monthly_income" })
    monthlyIncome: string;

    @Column({ default: null, name: "social_worker" })
    socialWorker: string;

    @Column({ default: null, name: "aid_type" })
    aidType: string;
}
