import React, { useState } from 'react'
import { IoMdArrowRoundBack, IoIosAdd } from "react-icons/io";
import Select, { StylesConfig } from 'react-select';
import { ProjectTypesList, CategoryList, countryList } from './Lists';

const CreateProject = () => {
    const [projectInfo, setProjectInfo] = useState({
        projectName: '',
        workOrderNo: '',
        projectType: '',
        category: '',
        client: '',
        clientContact: '',
        salsePerson: '',
        peojectManager: '',
        description: '',
        device: '',
        filterOption: '',
        country: []
    })
    const {
        projectName,
        workOrderNo,
        projectType,
        category,
        client,
        clientContact,
        salsePerson,
        peojectManager,
        description,
        device,
        filterOption,
        country
    } = projectInfo
    const [tableData, setTableData] = useState([
        // {
        //     sel: false,
        //     country: '',
        //     language: '',
        //     targetGroup: '',
        //     cpi: '',
        //     loi: '',
        //     ir: '',
        //     compleates: ''
        // }
    ])
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            background: '#fff',
            borderColor: '#9e9e9e',
            minHeight: '30px',
            height: '35px',
            boxShadow: state.isFocused ? null : null,
        }),

        valueContainer: (provided, state) => ({
            ...provided,
            height: '30px',
            padding: '0 6px'
        }),

        input: (provided, state) => ({
            ...provided,
            margin: '0px',
        }),
        indicatorSeparator: state => ({
            display: 'none',
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            height: '30px',
            padding: '0 6px'
        }),
    };
    const handleChangeInput = (e) => {
        setProjectInfo({
            ...projectInfo, [e.target.name]: e.target.value
        })
    }
    const handleChangeSelect = (val, name) => {
        setProjectInfo({
            ...projectInfo, [name]: val.value
        })
    }
    const handleChangeCheckBox = (e, val) => {
        setProjectInfo({
            ...projectInfo, [e.target.name]: val
        })
    }
    const handleChangeCountry = (val) => {
        if (val.length > tableData.length) {
            let countryName = val[val.length - 1]?.value || ''
            let countryLanguage = val[val.length - 1]?.countryLanguage || ''
            setTableData([
                ...tableData, { country: countryName, language: countryLanguage, key: tableData.length, sel: false }
            ])
        } else {
            const filteredArray = tableData.filter(obj1 => !val.some(obj2 => obj1.country === obj2.value && obj1.language === obj2.countryLanguage));
            const filteredArrayRemoved = tableData.filter(obj => obj.country !== filteredArray[0].country);
            setTableData([...filteredArrayRemoved])

        }
        const countryArray = val.map(item => item.value);

        setProjectInfo({
            ...projectInfo, country: countryArray
        })

    }
    console.log(tableData)
    const handleAddRow = (val, ind) => {
        let newOneData = { country: val.country, language: val.language, key: tableData.length + 1, sel: false }
        setTableData(prevCountryList => {
            const updatedCountryList = [...prevCountryList];
            updatedCountryList.splice(ind + 1, 0, newOneData);
            return updatedCountryList;
        });
    }
    const handleRemoveRow = (val) => {
        const filteredArray = tableData.filter(item => item.key !== val.key);
        setTableData(filteredArray)
    }
    const handleChangeTableInput = (e, ind) => {
        const updatedTableData = [...tableData]; // Create a copy of the tableData array
        updatedTableData[ind] = { // Update the object at the specified index
            ...updatedTableData[ind], // Keep the existing properties
            [e.target.name]: e.target.value // Update the specified property
        };
        setTableData(updatedTableData);
    }
    const tableDataSelecet = (val, ind) => {
        const updatedTableData = [...tableData]; // Create a copy of the tableData array
        updatedTableData[ind] = { // Update the object at the specified index
            ...updatedTableData[ind], // Keep the existing properties
            sel: val // Update the specified property
        };
        setTableData(updatedTableData);
    }
    console.log(projectInfo)
    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();

        // Append each field to the FormData object
        Object.keys(projectInfo).forEach(key => {
            formDataToSend.append(key, projectInfo[key]);
        });
        formDataToSend.append('tableData', tableData);
        // Now you can send formDataToSend to your API
        fetch('your-api-endpoint', {
            method: 'POST',
            body: formDataToSend
        })
            .then(response => {
                // Handle response from API
            })
            .catch(error => {
                // Handle error
            });
    }
    return (
        <div id="content" class="">
            <button> <IoMdArrowRoundBack /> back</button>
            <div class="container-fluid">
                <div class="row p-0 m-0">
                    <div class="col-8 project_info_main">
                        <h6>PROJECT INFORMATRION</h6>
                        <div class='row p-1 project_info'>
                            <div className='col-6'>
                                <label>Project Name</label>
                                <input name='projectName' value={projectName} onChange={handleChangeInput} />
                            </div>
                            <div className='col-6'>
                                <label>Work Order No.#</label>
                                <input name='workOrderNo' value={workOrderNo} onChange={handleChangeInput} />
                            </div>
                            <div className='col-4'>
                                <label>Project Type</label>
                                <Select
                                    onChange={(val) => handleChangeSelect(val, 'projectType')}
                                    options={ProjectTypesList}
                                    styles={customStyles}
                                />
                            </div>
                            <div className='col-4'>
                                <label>Category</label>
                                <Select
                                    onChange={(val) => handleChangeSelect(val, 'category')}
                                    options={ProjectTypesList}
                                    styles={customStyles}
                                />
                            </div>
                            <div className='col-4'>
                                <label>Client</label>
                                <Select
                                    onChange={(val) => handleChangeSelect(val, 'client')}
                                    options={ProjectTypesList}
                                    styles={customStyles}
                                />
                            </div>
                            <div className='col-4'>
                                <label>Client Contact</label>
                                <Select
                                    onChange={(val) => handleChangeSelect(val, 'clientContact')}
                                    options={ProjectTypesList}
                                    styles={customStyles}
                                />
                            </div>
                            <div className='col-4'>
                                <label>Sales Person</label>
                                <Select
                                    onChange={(val) => handleChangeSelect(val, 'salsePerson')}
                                    options={ProjectTypesList}
                                    styles={customStyles}
                                />
                            </div>
                            <div className='col-4'>
                                <label>Project Manager</label>
                                <Select
                                    onChange={(val) => handleChangeSelect(val, 'peojectManager')}
                                    options={ProjectTypesList}
                                    styles={customStyles}
                                />
                            </div>
                            <div className='col-12'>
                                <label>Project Description</label>
                                <textarea name='description' value={description} onChange={handleChangeInput} ></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="col-4 device_main">
                        <div class="col-12 ">
                            <h6>DEVICES</h6>
                            <div className='device'>
                                <div class="form-check">
                                    <input class="form-check-input" name='device' type="checkbox" onChange={(e) => handleChangeCheckBox(e, 'mobile')} checked={device == 'mobile' ? true : false} value="" id="defaultCheck1" />
                                    <label class="form-check-label" for="defaultCheck1">
                                        Mobile
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" name='device' type="checkbox" onChange={(e) => handleChangeCheckBox(e, 'tablate')} checked={device == 'tablate' ? true : false} value="" id="defaultCheck2" />
                                    <label class="form-check-label" for="defaultCheck2">
                                        Tablet
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" name='device' type="checkbox" onChange={(e) => handleChangeCheckBox(e, 'desktop')} checked={device == 'desktop' ? true : false} value="" id="defaultCheck2" />
                                    <label class="form-check-label" for="defaultCheck2">
                                        Desktop
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 mt-4">
                            <h6>FILTER OPTIONS</h6>
                            <div className='device'>
                                <div class="form-check">
                                    <input class="form-check-input" name='filterOption' onChange={(e) => handleChangeCheckBox(e, 'gatesurvey')} checked={filterOption == 'gatesurvey' ? true : false} type="checkbox" value="" id="defaultCheck1" />
                                    <label class="form-check-label" for="defaultCheck1">
                                        Gatesurvey
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" name='filterOption' onChange={(e) => handleChangeCheckBox(e, 'froud_detection')} checked={filterOption == 'froud_detection' ? true : false} type="checkbox" value="" id="defaultCheck2" />
                                    <label class="form-check-label" for="defaultCheck2">
                                        Froud_detection
                                    </label>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="col-12 device_main p-0">
                        <div class="col-12 ">
                            <h6>DEVICES</h6>
                            <div className='device'>
                                <label>Country</label>
                                <Select
                                    // defaultValue={selectedOption}
                                    onChange={handleChangeCountry}
                                    isMulti
                                    options={countryList}
                                    styles={customStyles}
                                />
                            </div>
                        </div>

                    </div>
                    <div class="col-12 device_main p-0">
                        <div class="col-12 ">
                            <h6>DEVICES</h6>
                            <div className='device'>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Sel.</th>
                                            <th scope="col">Country</th>
                                            <th scope="col">Language</th>
                                            <th scope="col">Target Group</th>
                                            <th scope="col">CPI($)</th>
                                            <th scope="col">LOI(MIN.)</th>
                                            <th scope="col">IR(%)</th>
                                            <th scope="col">Completes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            tableData.map((val, ind) => (
                                                <tr>
                                                    <td> <input class="form-check-input" type="checkbox" checked={tableData[ind].sel} onChange={() => tableDataSelecet(!tableData[ind].sel, ind)} id="flexCheckDefault" /></td>
                                                    <td>{val.country}</td>
                                                    <td>{val.language}</td>
                                                    <td style={{ display: 'flex', alignItems: 'center' }}>
                                                        <input type="text" value={tableData[ind].targetGroup} name='targetGroup' onChange={(e) => handleChangeTableInput(e, ind)} id="flexCheckDefault" style={{ marginRight: '5px' }} />
                                                        <button className='icon_btn green' onClick={() => handleAddRow(val, ind)} style={{ marginRight: '5px' }}>+</button>
                                                        <button className='icon_btn red' onClick={() => handleRemoveRow(val)} >×</button>
                                                    </td>
                                                    <td> <input type="text" name='cpi' onChange={(e) => handleChangeTableInput(e, ind)} value={tableData[ind].cpi} id="flexCheckDefault" /></td>
                                                    <td> <input type="text" name='loi' onChange={(e) => handleChangeTableInput(e, ind)} value={tableData[ind].loi} id="flexCheckDefault" /></td>
                                                    <td> <input type="text" name='ir' onChange={(e) => handleChangeTableInput(e, ind)} value={tableData[ind].ir} id="flexCheckDefault" /></td>
                                                    <td> <input type="text" name='completes' onChange={(e) => handleChangeTableInput(e, ind)} value={tableData[ind].completes} id="flexCheckDefault" /></td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                                {/* <button onClick={addTableRow}>add</button> */}
                            </div>
                        </div>

                    </div>
                    <div class="col-12 submit_bar " style={{ display: 'flex', alignItems: 'end' }}>
                        <button className='cancel_btn btn btn-danger ms-auto' type='button' >Cancel</button>
                        <button className='submit_btn btn btn-primary ms-2' onClick={handleSubmit} type='button'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateProject