/*
 * Copyright (c) 2016 He Yu <kiddmagician@gmail.com>
 * All Rights Reserved.
*/

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

function deassemble(content)
{
    memory = [];

    curAddr = 0;

    for (var i in content)
    {
        line = content[i].trim();

    }

}