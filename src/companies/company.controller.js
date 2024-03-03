'use strict'

import { response } from 'express';
import Company from '../companies/company.model.js';

export const companyPost = async (req, res) => {
    const {name, impactLevel, yearsTrayectory, category} = req.body;

    const company = new Company({name, impactLevel, yearsTrayectory, category});

    await company.save();

    res.status(200).json({
        company
    })
}

export const companyPut = async (req, res = response) => {
    const {id} = req.params;
    const {_id, ...resto} = req.body;

    await Company.findByIdAndUpdate(id, resto);

    const company = await Company.findOne({_id: id});

    res.status(200).json({
        msg: "company updated",
        company
    })
}

export const companyGet = async (req = request, res = response) => {
    const {limit, from} = req.body;
    const query = {status: true};

    const [total, companies] = await Promise.all([
        Company.countDocuments(query),
        Company.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    res.status(200).json({
        total, 
        companies
    })

}


