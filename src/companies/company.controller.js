'use strict'

import { response } from 'express';
import Company from '../companies/company.model.js';
import ExcelJS from 'exceljs'

export const companyPost = async (req, res) => {
    const { name, impactLevel, yearsTrayectory, category } = req.body;

    const company = new Company({ name, impactLevel, yearsTrayectory, category });

    await company.save();

    res.status(200).json({
        company
    })
}

export const companyPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    await Company.findByIdAndUpdate(id, resto);

    const company = await Company.findOne({ _id: id });

    res.status(200).json({
        msg: "company updated",
        company
    })
}

export const companyGet = async (req = request, res = response) => {
    const { limit, from } = req.body;
    const query = { status: true };

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

export const getCompanyByYearsTrayectory = async (req, res) => {
    const { yearsTrayectory } = req.params;
    const companies = await Company.find({ yearsTrayectory: yearsTrayectory, status: true });

    if (companies.length === 0) {
        return res.status(404).json({
            msg: "The company with that year of experience does not exist"
        });
    }

    res.status(200).json({
        companies
    })
}
export const getCompanyByCategory = async (req, res) => {
    const { category } = req.params; 
    const companies = await Company.find({ category: category, status: true });

    if (companies.length === 0) {
        return res.status(404).json({
            message: "The category entered does not exist"
        });
    }

    res.status(200).json({
        companies
    });
};

export const getCompanyByAcendent = async (req, res) => {
    const companies = await Company.find({ status: true }).sort({ name: 1 });
    res.status(200).json({
        companies
    })
}

export const getCompanyByDecendent = async (req, res) => {
    const companies = await Company.find({ status: true }).sort({ name: -1 });

    res.status(200).json({
        companies
    })
}

export const generateCompanyReport = async (req, res) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Companies');

    worksheet.columns = [
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Impact Level', key: 'impactLevel', width: 15 },
        { header: 'Years of Trayectory', key: 'yearsTrayectory', width: 20 },
        { header: 'Category', key: 'category', width: 30 },
        { header: 'Status', key: 'status', width: 10 }
    ];

    const companies = await Company.find({});

    companies.forEach(company => {
        worksheet.addRow({
            name: company.name,
            impactLevel: company.impactLevel,
            yearsTrayectory: company.yearsTrayectory,
            category: company.category,
            status: company.status ? 'true' : 'false'
        });
    });


    await workbook.xlsx.writeFile('companyReport.xlsx');
    
    res.status(200).json({
        msg: "The report has been generated successfully"
    })
};