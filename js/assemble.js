/*
 * Copyright (c) 2016 He Yu <kiddmagician@gmail.com>
 * All Rights Reserved.
 */

var baseAddr = 0;
var dataAddr = 0;
var curAddr = 0;
var addrPointer = 0;
var labelTable = {};
var parseMode = 'instruction';
var memory = [];
var dictionary = {

        '#DataAddr': {
            op: "data",
            format: "imm",
            type: 'M'
        },
        '#baseAddr': {
            op: "base",
            format: "imm",
            type: 'M'
        },
        '.text':{
            op: "base",
            format: 'imm',
            type: 'M'
        },
        '.data':{
            op: "data",
            format: 'imm',
            type: 'M'
        },
        'db': {
            op: "db",
            format: '',
            type: 'D'
        },
        'dw': {
            op: "dw",
            format: '',
            type: 'D'
        },
        'dd': {
            op: "dd",
            format: '',
            type: 'D'
        },
        'add': {
            op: 0x0,
            func: 0x20,
            format: "rd/rs/rt",
            type: 'R'
        },
        'addu': {
            op: 0x0,
            func: 0x21,
            format: "rd/rs/rt",
            type: 'R'
        },
        'addi': {
            op: 0x8,
            format: "rt/rs/imm",
            type: 'I'
        },
        'addiu': {
            op: 0x9,
            format: "rt/rs/imm",
            type: 'I'
        },
        'and': {
            op: 0x0,
            func: 0x24,
            format: "rd/rs/rt",
            type: 'R'
        },
        'andi': {
            op: 0xc,
            format: "rt/rs/imm",
            type: "I"
        },
        'div': {
            op: 0x0,
            format: "rs/rt",
            func: 0x1a,
            type: "R"
        },
        'divu': {
            op: 0x0,
            format: "rs/rt",
            func: 0x1b,
            type: "R"
        },
        'mult': {
            op: 0x0,
            format: "rs/rt",
            func: 0x18,
            type: "R"
        },
        'multu': {
            op: 0x0,
            format: "rs/rt",
            func: 0x19,
            type: "R"
        },
        'mul': {
            op: 0x1c,
            format: "rd/rs/rt",
            func: 0x2,
            type: "R"
        },
        'madd': {
            op: 0x1c,
            format: "rs/rt",
            func: 0x0,
            type: "R"
        },
        'maddu': {
            op: 0x1c,
            format: "rs/rt",
            func: 0x1,
            type: "R"
        },
        'msub': {
            op: 0x1c,
            format: "rs/rt",
            func: 0x4,
            type: "R"
        },
        'msubu': {
            op: 0x1c,
            format: "rs/rt",
            func: 0x5,
            type: "R"
        },
        'nor': {
            op: 0x0,
            format: "rd/rs/rt",
            func: 0x27,
            type: "R"
        },
        'or': {
            op: 0x0,
            format: "rd/rs/rt",
            func: 0x25,
            type: "R"
        },
        'ori': {
            op: 0xd,
            format: "rt/rs/imm",
            type: "I"
        },
        'sll': {
            op: 0x0,
            format: "rd/rt/shamt",
            func: 0x0,
            type: "R"
        },
        'sllv': {
            op: 0x0,
            format: "rd/rt/rs",
            func: 0x4,
            type: "R"
        },
        'sra': {
            op: 0x0,
            format: 'rd/rt/shamt',
            func: 0x3,
            type: "R"
        },
        'srav': {
            op: 0x0,
            format: 'rd/rt/rs',
            func: 0x7,
            type: "R"
        },
        'srl': {
            op: 0x0,
            format: 'rd/rt/shamt',
            func: 0x2,
            type: "R"
        },
        'srlv': {
            op: 0x0,
            format: 'rd/rt/rs',
            func: 0x6,
            type: "R"
        },
        'sub': {
            op: 0x0,
            format: 'rd/rs/rt',
            func: 0x22,
            type: "R"
        },
        'subu': {
            op: 0x0,
            format: 'rd/rs/rt',
            func: 0x23,
            type: "R"
        },
        'xor': {
            op: 0x0,
            format: 'rd/rs/rt',
            func: 0x26,
            type: "R"
        },
        'xori': {
            op: 0xe,
            format: 'rt/rs/imm',
            type: "I"
        },
        'lui': {
            op: 0xf,
            format: 'rt/imm',
            type: "I"
        },
        'slt': {
            op: 0x0,
            format: 'rd/rs/rt',
            func: 0x2a,
            type: "R"
        },
        'sltu': {
            op: 0x0,
            format: 'rd/rs/rt',
            func: 0x2b,
            type: "R"
        },
        'slti': {
            op: 0xa,
            format: 'rt/rs/imm',
            type: "I"
        },
        'sltiu': {
            op: 0xb,
            format: 'rt/rs/imm',
            type: "I"
        },
        'beq': {
            op: 0x4,
            format: 'rs/rt/label',
            type: "I"
        },
        'bgez': {
            op: 0x1,
            format: 'rs/label',
            func: 0x1,
            type: "I"
        },
        'bgezal': {
            op: 0x1,
            format: 'rs/label',
            func: 0x11,
            type: "I"
        },
        'bgtz': {
            op: 0x7,
            format: 'rs/label',
            func: 0x0,
            type: "I"
        },
        'blez': {
            op: 0x6,
            format: 'rs/label',
            func: 0x0,
            type: "I"
        },
        'bltzal': {
            op: 0x1,
            format: 'rs/label',
            func: 0x10,
            type: "I"
        },
        'bltz': {
            op: 0x1,
            format: 'rs/label',
            func: 0x0,
            type: "I"
        },
        'bne': {
            op: 0x5,
            format: 'rs/rt/label',
            type: "I"
        },
        'j': {
            op: 0x2,
            format: 'label',
            type: "J"
        },
        'jal': {
            op: 0x3,
            format: 'label',
            type: 'J'
        },
        'jalr': {
            op: 0x0,
            format: 'rs/rd',
            code1: 0x0,
            code2: 0x0,
            code3: 0x9,
            type: 'R'
        },
        'jr': {
            op: 0x0,
            format: 'rs',
            func: 0x8,
            type: "R"
        },
        'teq': {
            op: 0x0,
            format: 'rs/rt',
            func: 0x34,
            type: "R"
        },
        'teqi': {
            op: 0x1,
            format: 'rs/imm',
            func: 0xc,
            type: "I"
        },
        'tne': {
            op: 0x0,
            format: 'rs/rt',
            func: 0x36,
            type: "R"
        },
        'tnei': {
            op: 0x1,
            format: 'rs/imm',
            func: 0xe,
            type: "I"
        },
        'tge': {
            op: 0x0,
            format: 'rs/rt',
            func: 0x30,
            type: "R"
        },
        'tgeu': {
            op: 0x0,
            format: 'rs/rt',
            func: 0x31,
            type: "R"
        },
        'tgei': {
            op: 0x1,
            format: 'rs/imm',
            func: 0x8,
            type: "I"
        },
        'tgeiu': {
            op: 0x1,
            format: 'rs/imm',
            func: 0x9,
            type: "I"
        },
        'tlt': {
            op: 0x0,
            format: 'rs/rt',
            func: 0x32,
            type: "R"
        },
        'tltu': {
            op: 0x0,
            format: 'rs/rt',
            func: 0x33,
            type: "R"
        },
        'tlti': {
            op: 0x1,
            format: 'rs/imm',
            func: 0xa,
            type: "I"
        },
        'tltiu': {
            op: 0x1,
            format: 'rs/imm',
            func: 0xb,
            type: "I"
        },        
        'lb': {
            op: 0x20,
            format: 'rt/imm/rs',            
            type: "I"
        },
        'lbu': {
            op: 0x24,
            format: 'rt/imm/rs',            
            type: "I"
        },
        'lh': {
            op: 0x21,
            format: 'rt/imm/rs',            
            type: "I"
        },
        'lhu': {
            op: 0x25,
            format: 'rt/imm/rs',            
            type: "I"
        },

        'lw': {
            op: 0x23,
            format: 'rt/imm/rs',            
            type: "I"
        },
        'lwcl': {
            op: 0x31,
            format: 'rt/imm/rs',            
            type: "I"
        },
        'lwl': {
            op: 0x22,
            format: 'rt/imm/rs',            
            type: "I"
        },
        'lwr': {
            op: 0x26,
            format: 'rt/imm/rs',            
            type: "I"
        },
        'll': {
            op: 0x30,
            format: 'rt/imm/rs',            
            type: "I"
        },
        
        'sb': {
            op: 0x28,
            format: 'rt/imm/rs',            
            type: "I"
        },
        'sh': {
            op: 0x29,
            format: 'rt/imm/rs',            
            type: "I"
        },
        'sw': {
            op: 0x2b,
            format: 'rt/imm/rs',            
            type: "I"
        },
        'swcl': {
            op: 0x31,
            format: 'rt/imm/rs',            
            type: "I"
        },
        'sdcl': {
            op: 0x3d,
            format: 'rt/imm/rs',            
            type: "I"
        },
        'swl': {
            op: 0x2a,
            format: 'rt/imm/rs',            
            type: "I"
        },
        'swr': {
            op: 0x2e,
            format: 'rt/imm/rs',            
            type: "I"
        },
        'sc': {
            op: 0x38,
            format: 'rt/imm/rs',            
            type: "I"
        },
        'mfhi': {
            op: 0x0,
            format: 'rd',            
            func: 0x10,
            type: "R"
        },
        'mflo': {
            op: 0x0,
            format: 'rd',            
            func: 0x12,
            type: "R"
        },
        'mthi': {
            op: 0x0,
            format: 'rs',            
            func: 0x11,
            type: "R"
        },
        'mtlo': {
            op: 0x0,
            format: 'rs',            
            func: 0x13,
            type: "R"
        },
        'movn': {
            op: 0x0,
            format: 'rd/rs/rt',                        
            func: 0xb,
            type: "R"
        },
        'movz': {
            op: 0x0,
            format: 'rd/rs/rt',                        
            func: 0xa,
            type: "R"
        },
        'movf': {
            op: 0x0,
            format: 'rd/rs/cc',                        
            code1: 0,
            func: 0x1,
            type: "R"
        },
        'movt': {
            op: 0x0,
            format: 'rd/rs/cc',                        
            code1: 1,
            func: 0x1,
            type: "R"
        },
        'eret': {
            op: 0x10,
            format: 'null',
            code1: 1 << 19,
            func: 0x18,
            type: "E"
        },
        'syscall': {
            op: 0x0,
            format: 'null',
            code1: 0,
            func: 0xc,
            type: "E"
        },
        'break': {
            op: 0x0,
            format: 'code',
            func: 0xd,
            type: "E"
        },
        'nop': {
            op: 0,
            type: "N"
        }
    };


function labelToAddress(label)
{
    if (labelTable[label[0]] != undefined)
    {
        return labelTable[label[0]];
    }else{
        return -1;
    }
}

function labelToOffset(label)
{
    if (labelTable[label[0]] != undefined)
    {
        return labelTable[label[0]] - curAddr;
    }else{
        return -1;
    }
}

function getStrategy(op) {    
    try {
        return dictionary[op];
    } catch (e) {
        throw new Error("Illegal instruction");
    }
}

function assemble(content)
{
    memory = [];
    curAddr = 0;
    var i, line;

    for (i in content)
    {
        line = content[i].trim();

        if (line.match(":"))
        {
            line = line.split(":");
            console.log(line);
            if (line.length == 2)
            {
                var label = line[0];
                console.log(label);
                labelTable[label] = curAddr;
            }else{

            }

            continue;
        }

        var token = tokenize(line);
        if (!token) continue;

        if (token.operation.type == "M")
        {
            if (token.operation.op == "base")
            {
                if (token.data[0].match(/x/))
                {
                    curAddr = parseInt(token.data, 16);
                }else{
                    curAddr = parseInt(token.data);
                }
            }
        }else{
            console.log("pusAddr" + curAddr);
            memory.push({
                addr: curAddr,
                instruction: translate(token.operation, token.data),
                asmData: token.data,
                asm: token.operation,
                line: i
            });
            curAddr += 4;
        }
    }
    for (var i in memory)
    {
        if (memory[i].asm.type == "J")
        {
            var transJ = translate(memory[i].asm, memory[i].asmData);
            if (transJ)
            {
                memory[i].instruction = transJ;
            }
        }
    }
    return memory;
}

function tokenize(line) {
    if (line == '') {
        return false;
    }
    var instruction = line.split('//')[0].trim();
    instruction = instruction.split(";")[0].trim();

    if (instruction == '')
        return false;

    var instruction_array = instruction.split(/\s/);

    var op = instruction_array[0].trim();
    var data = instruction_array.slice(1, instruction_array.length).join('').trim();
    data = data.split(/,|,\s/);


    console.log(op, '|', data);

    var operation = getStrategy(op);

    return {
        "op": op,
        "marker": true,
        "data": data,
        "operation": operation
    };
}

function leftpad(string, length)
{
    while (string.length < length)
    {
        string = '0' + string;
    }
    return string;
}

function translateRegister(reg)
{
    var registers = {
        "$zero": 0,
        "$at": 1,
        "$v0": 2,
        "$v1": 3,
        "$a0": 4,
        "$a1": 5,
        "$a2": 6,
        "$a3": 7,
        "$t0": 8,
        "$t1": 9,
        "$t2": 10,
        "$t3": 11,
        "$t4": 12,
        "$t5": 13,
        "$t6": 14,
        "$t7": 15,
        "$s0": 16,
        "$s1": 17,
        "$s2": 18,
        "$s3": 19,
        "$s4": 20,
        "$s5": 21,
        "$s6": 22,
        "$s7": 23,
        "$t8": 24,
        "$t9": 25,
        "$k0": 26,
        "$k1": 27,
        "$gp": 28,
        "$sp": 29,
        "$fp": 30,
        "$ra": 31,
    };

    try {
        console.log(registers[reg]);
        return registers[reg];
    } catch (e)
    {
        throw new Error("Illegal Register");        
    }
}

function markPosition(line_num, mark) {

}

function translate(operation, data) {
    var type = operation.type;
    var res = {};

    res.type = type;
   

    var handleInstruction = {
        "J": handleInstructionJ,
        "I": handleInstructionI,
        "R": handleInstructionR,
        "M": handleInstructionM,
        "E": handleInstructionE
    };


    try {
        res.code = handleInstruction[type](operation, data);
        console.log(res);
    } catch (e) {
        console.error(e);
    }

    return res;
}

function handleInstructionJ(operation, data) {

    var opcode = operation.op;


    var res = leftpad(opcode.toString(2), 6);
    console.log(labelToAddress(data));
    if (labelToAddress(data) != -1) {
        res = res + leftpad(labelToAddress(data).toString(2).slice(0, -2), 26);
        return res;
    }else{
        return false;
    }
}

function handleInstructionI(operation, data) {

    var opcode = operation.op;
    var format = operation.format;
    var func = operation.func;

    var res = leftpad(opcode.toString(2), 6);

    console.log(opcode, format, data);


    var rt, rs, imm, label;
    try {
        switch (format) {
            case "rt/rs/imm":
                rt = data[0];
                rs = data[1];
                imm = data[2];

                res = res + leftpad(translateRegister(rs).toString(2), 5);
                res = res + leftpad(translateRegister(rt).toString(2), 5);
                res = res + leftpad(parseInt(imm).toString(2), 16);

                console.log(res);
                break;
            case "rs/imm":
                rs = data[0];
                imm = data[1];

                res = res + leftpad(translateRegister(rs).toString(2), 5);
                res = res + leftpad(parseInt(imm).toString(2), 21);

                break;
            case "rt/imm/rs":
                rt = data[0];
                var regres = /(.+)\((.+)\)/.exec(data[1]);
                imm = regres[1];
                rs = regres[2];

                res = res + leftpad(translateRegister(rs).toString(2), 5);
                res = res + leftpad(translateRegister(rt).toString(2), 5);
                res = res + leftpad(parseInt(imm).toString(2), 16);

                break;
            case "rs/label":

                rs = data[0];
                label = data[1];

                res = res + leftpad(translateRegister(rs).toString(2), 5);
                res = res + leftpad(func.toString(2), 5);
                res = res + leftpad(labelToOffset(label).toString(2).slice(0,-2), 16);

                break;
            case "rs/rt/label":
                rs = data[0];
                rt = data[1];
                label = data[2];

                res = res + leftpad(translateRegister(rs).toString(2), 5);
                res = res + leftpad(translateRegister(rt).toString(2), 5);
                res = res + leftpad(labelToOffset(label).toString(2).slice(0,-2), 16);

                break;
            case "rt/imm":
                rt = data[0];
                imm = data[1];

                res = res + leftpad(translateRegister(rt).toString(2), 10);
                res = res + leftpad(parseInt(imm).toString(2), 16);

                break;
        }
    } catch (e)
    {
        console.error(e);
    }
        
    console.log(res);

    return res;
}

function handleInstructionR(operation, data) {

    var opcode = operation.op;
    var func = operation.func;
    var format = operation.format;


    var res = leftpad(opcode.toString(2), 6);

    console.log(res);

    var rt, rs, rd, cc, sa;

    try {
        switch (format) {
            case "rd/rs/rt":
                rd = data[0];
                rs = data[1];
                rt = data[2];

                res = res + leftpad(translateRegister(rs).toString(2), 5);
                res = res + leftpad(translateRegister(rt).toString(2), 5);
                res = res + leftpad(translateRegister(rd).toString(2), 5);
                res = res + leftpad(func.toString(2), 11);
                break;
            case "rs/rt":
                rs = data[0];
                rt = data[1];

                res = res + leftpad(translateRegister(rs).toString(2), 5);
                res = res + leftpad(translateRegister(rt).toString(2), 5);
                res = res + leftpad(func.toString(2), 16);
                break;
            case "rd":
                rd = data[0];

                res = res + leftpad(translateRegister(rd).toString(2), 15);
                res = res + leftpad(func.toString(2), 11);
                break;
            case "rs":
                rs = data[0];

                res = res + leftpad(translateRegister(rs).toString(2), 5);
                res = res + leftpad(func.toString(2), 21);

                break;
            case "rd/rt/shamt":
                rd = data[0];
                rt = data[1];
                sa = data[2];

                res = res + leftpad(translateRegister(rt).toString(2), 10);
                res = res + leftpad(translateRegister(rd).toString(2), 5);
                res = res + leftpad(translateRegister(sa).toString(2), 5);
                res = res + leftpad(func.toString(2), 6);
                break;
            case "rd/rt/rs":
                rd = data[0];
                rt = data[1];
                rs = data[2];

                res = res + leftpad(translateRegister(rs).toString(2), 5);
                res = res + leftpad(translateRegister(rt).toString(2), 5);
                res = res + leftpad(translateRegister(rd).toString(2), 5);
                res = res + leftpad(func.toString(2), 11);
                break;           
        }
    } catch (e)
    {
        console.error(e);
    }

    console.log(res);

    return res;    
}

function handleInstructionM(opcode, format, data) {
    console.log(data);
    if (opcode == 'data')
    {
        dataAddr = parseInt(data, 16);
        parseMode = 'data';
    }

    else if (opcode == 'base') {
        baseAddr = parseInt(data, 16);
        parseMode = 'instruction';
        addrPointer = baseAddr
    }
    else
        throw new Error("Undefined marker");
    
    return '';
}

function handleInstructionE(opcode, format, data) {
    
}