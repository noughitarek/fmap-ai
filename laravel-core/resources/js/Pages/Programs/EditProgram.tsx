import React, { useState } from 'react';
import { PageProps, Program, ProgramRecord, ProgramsGroup, TemplatesGroup } from '@/types';
import { Head, Link } from '@inertiajs/react';
import Page from '@/Base-components/Page';
import Webmaster from '@/Layouts/Webmaster';
import { Button } from '@headlessui/react';
import Grid from '@/Base-components/Grid';
import { toast } from 'react-toastify';
import { router, useForm } from '@inertiajs/react';
import CustomTextInput from '@/Base-components/Forms/CustomTextInput';
import CustomTextarea from '@/Base-components/Forms/CustomTextarea';
import CustomSelect from '@/Base-components/Forms/CustomSelect';
import CustomNumber from '@/Base-components/Forms/CustomNumber';

interface ProgramFormData {
    name: string;
    description: string;
    group_id: number;
    reuse_after: number;
    unit_of_time: number;
    program_records: ProgramRecord[];
}

const EditProgram: React.FC<PageProps<{ groups: ProgramsGroup[], templates_groups: TemplatesGroup[], program: Program }>> = ({ menu, auth, groups, templates_groups, program }) => {
    console.log(program.records);

    const programForm = useForm<ProgramFormData>({
        name: program.name,
        description: program.description,
        group_id: program.group.id,
        reuse_after: program.reuse_after,
        unit_of_time: 1,
        program_records: program.records,
    });



    console.log(programForm.data);
    const [editing, setEditing] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        programForm.setData(name as keyof ProgramFormData, value);
    };

    const timesUnites = [
        { id: 1, name: 'Seconds' }, 
        { id: 60, name: 'Minutes' }, 
        { id: 3600, name: 'Hours' }, 
        { id: 86400, name: 'Days' }
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEditing(true);

        programForm.post(route('programs.update', {program: program}), {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Program has been edited successfully');
                router.get(route('programs.index'));
            },
            onError: (error) => {
                toast.error('Error editing the program');
                console.error('Error:', error);
            },
            onFinish: () => {
                setEditing(false);
            }
        });
    };
    const moreRecords: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        const moreProgramRecords: ProgramRecord[] = [
            {
                id: Date.now(),
                group: 0,
                template: 0,
                send_after: 0,
                unit_of_time: 0,
            }
        ];
        programForm.setData(prevData => ({
            ...prevData,
            program_records: [...prevData.program_records, ...moreProgramRecords]
        }));
    };

    const removeRecords = (index: number) => {
        programForm.setData(prevData => ({
            ...prevData,
            program_records: prevData.program_records.filter((_, i) => i !== index),
        }));
    };

    const handleRecordChange = (index: number, field: keyof ProgramRecord, value: any) => {
        const updatedRecords = [...programForm.data.program_records];

        if(field == "group" && value === 0){
            const { template, ...rest } = updatedRecords[index];
            updatedRecords[index] = { ...rest };
        }
        else if(field == "group" )
        {
            updatedRecords[index] = {
                ...updatedRecords[index],
                template: 0
            };
        }

        updatedRecords[index] = { ...updatedRecords[index], [field]: value };
        programForm.setData('program_records', updatedRecords);
    };

    const saveButton = (
        <Button className="btn btn-primary mt-4" disabled={editing} onClick={handleSubmit}>
            {editing ? "Editing" : "Edit"}
        </Button>
    );
    console.log(program)
    return (
        <>
            <Head title="Edit a program" />
            <Webmaster
                user={auth.user}
                menu={menu}
                breadcrumb={
                    <>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link href={route('programs.index')}>Programs</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">{program.group.name}</li>
                        <li className="breadcrumb-item" aria-current="page">{program.name}</li>
                        <li className="breadcrumb-item active" aria-current="page">Edit</li>
                    </>
                }
            >
                <Page title="Edit a program" header={<></>}>
                    <Grid title="Program's information" header={saveButton}>
                        <CustomTextInput
                            title="Name"
                            value={programForm.data.name}
                            name='name'
                            description='Enter the name of the program'
                            required={true}
                            handleChange={handleChange}
                            instructions='Minimum 5 characters'
                        />
                        <CustomTextarea
                            title="Description"
                            value={programForm.data.description}
                            name='description'
                            description='Enter the description of the program'
                            required={false}
                            handleChange={handleChange}
                            instructions='Not required'
                        />
                        <CustomSelect
                            title="Programs group"
                            elements={groups}
                            value={programForm.data.group_id}
                            name='group_id'
                            description='Enter the group you want to assign the program to'
                            required={true}
                            handleChange={handleChange}
                            instructions='Required'
                        />
                    </Grid>
                    <Grid title="Reuse after">
                        <CustomNumber
                            title="Reuse after"
                            value={programForm.data.reuse_after}
                            name='reuse_after'
                            description='Enter the time you want to reuse the program after'
                            required={true}
                            handleChange={handleChange}
                            instructions='Required'
                        />
                        <CustomSelect
                            title="Unit of time"
                            elements={timesUnites}
                            value={programForm.data.unit_of_time}
                            name='unit_of_time'
                            description='Enter the unit of time'
                            required={true}
                            handleChange={handleChange}
                            instructions='Required'
                        />
                    </Grid>
                    <Grid title="Program's schedule" header={<Button className="btn btn-primary" onClick={moreRecords}>More records</Button>}>
                        {programForm.data.program_records.map((program, index) => (
                            <div key={program.id} className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0 pb-4">
                                <div className="form-label xl:w-64 xl:!mr-10">
                                    <div className="text-left">
                                        <div className="flex items-center">
                                            <div className="font-medium">Schedule {index + 1}</div>
                                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                Required
                                            </div>
                                        </div>
                                        <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                            description
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full mt-3 xl:mt-0 flex-1">
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={program.send_after || ''}
                                        onChange={(e) => handleRecordChange(index, 'send_after', +e.target.value)}
                                    />
                                    <div className="form-help text-right mt-2">Send after</div>
                                </div>
                                <div className="w-full mt-3 xl:mt-0 flex-1 ms-2">
                                    <select
                                        className="form-control"
                                        value={1}
                                        onChange={(e) => handleRecordChange(index, 'unit_of_time', +e.target.value)}
                                    >
                                        <option value="">Select the unit of time</option>
                                        {timesUnites.map(time_unite => (
                                            <option key={time_unite.id} value={time_unite.id}>{time_unite.name}</option>
                                        ))}
                                    </select>
                                    <div className="form-help text-right mt-2">Unit of time</div>
                                </div>
                                <div className="w-full mt-3 xl:mt-0 flex-1 ms-2">
                                    <select
                                        className="form-control"
                                        defaultValue={typeof program.group === 'number' ? program.group : program.group?.id || ''}
                                        onChange={(e) => handleRecordChange(index, 'group', +e.target.value)}
                                    >
                                        <option value="">Select the group of templates</option>
                                        {templates_groups.map(group => (
                                            <option key={group.id} value={group.id}>{group.name}</option>
                                        ))}
                                    </select>
                                    <div className="form-help text-right mt-2">Optional</div>
                                </div>
                                <div className="w-full mt-3 xl:mt-0 flex-1 ms-2">
                                    <select
                                        className="form-control"
                                        defaultValue={typeof program.template === 'number' ? program.template : program.template?.id || ''}
                                        onChange={(e) => handleRecordChange(index, 'template', +e.target.value)}
                                    >
                                        <option value="">Select the templates</option>
                                        {templates_groups
                                            .find(group => group.id === (typeof program.group === 'number' ? program.group : program.group?.id))?.templates
                                            .map(template => (
                                                <option key={template.id} value={template.id}>{template.name}</option>
                                            ))}
                                    </select>
                                    <div className="form-help text-right mt-2">Optional</div>
                                </div>
                                <div className="mt-3 xl:mt-0 ms-2">
                                    <Button className='btn btn-primary' onClick={() => removeRecords(index)}>-</Button>
                                </div>
                            </div>
                        ))}
                        {saveButton}
                    </Grid>
                </Page>
            </Webmaster>
        </>
    );
};

export default EditProgram;
