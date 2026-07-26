import { readFileSync, existsSync } from 'fs';
import Table from 'cli-table3';
import ansi from 'ansis';

const file_blocks = readFileSync('coverage/lcov.info', 'utf8').split('SF:');
file_blocks.shift();

const table = new Table({
    head: [ansi.bold("File".padEnd(30)), ansi.bold("Untested functions")],
    style: { head: [], border: ["grey"] }
});

let has_untested_function = false;

for (const file_block of file_blocks) {
    const lines = file_block.split('\n');
    const file_path = lines[0].trim();
    const functions = [];

    for (const line of lines) {
        if (line.startsWith('FNDA:0,')) {
            const func_name = line.substring(7).trim();
            functions.push(ansi.red(func_name + "()"));
        }
    }

    if (functions.length > 0) {
        has_untested_function = true;
        table.push(["📄 " + ansi.whiteBright(file_path), functions.join("\n")]);
    }
}

if (has_untested_function) {
    console.log(table.toString());
    process.exit(0);
}

const MAX_LINE_LENGTH = 80;

const detailed_table = new Table({
    head: [" " + ansi.bold("File".padEnd(30)), " " + ansi.bold("Untested Code Blocks")],
    style: {
        'padding-left': 0,
        'padding-right': 0,
        head: [],
        border: ["grey"]
    }
});

let has_untested_lines = false;

for (const file_block of file_blocks) {
    const lines = file_block.split('\n');
    const file_path = lines[0].trim();
    const source_lines = readFileSync(file_path, 'utf8').split('\n');

    let untested_lines = {};

    for (const line of lines) {
        if (line.startsWith('DA:')) {
            const [line_index, hit] = line.substring(3).split(",").map(Number);
            if (hit == 0) {
                untested_lines[line_index] = { "line_index": line_index, "code": source_lines[line_index - 1].replace(/\r/g, '').replace(/\t/g, '    '), "color_fn": ansi.red };
            }
        }

        if (line.startsWith('BRDA:')) {
            const [line_index, , , hit] = line.substring(5).split(",").map(Number);

            if (hit == 0 && untested_lines[line_index] == null) {
                untested_lines[line_index] = { "line_index": line_index, "code": source_lines[line_index - 1].replace(/\r/g, '').replace(/\t/g, '    '), "color_fn": ansi.yellow };
            }
        }
    }

    untested_lines = Object.values(untested_lines);
    untested_lines = untested_lines.filter(l => !(/^\s*\}[\s;]*$/.test(l.code)));
    if (untested_lines.length == 0) continue;

    has_untested_lines = true;
    untested_lines = untested_lines.sort((a, b) => a.line_index - b.line_index);

    const blocks = [[untested_lines[0]]];

    for (let i = 1; i < untested_lines.length; i++) {
        (untested_lines[i].line_index === untested_lines[i - 1].line_index + 1) ? blocks[blocks.length - 1].push(untested_lines[i]) : blocks.push([untested_lines[i]]);
    }

    const formatted_blocks = [];

    for (const block of blocks) {
        const indents = block.filter(l => l.code.trim().length > 0).map(l => l.code.match(/^\s*/)[0].length);
        const min_indent = indents.length > 0 ? Math.min(...indents) : 0;

        for (const untested_line of block) {
            untested_line.code = untested_line.code.substring(min_indent);

            if (untested_line.code.length > MAX_LINE_LENGTH) {
                untested_line.code = untested_line.code.substring(0, MAX_LINE_LENGTH - 3) + " " + ansi.whiteBright("...");
            }
        }

        formatted_blocks.push(block.map(l => " " + ansi.dim(String(l.line_index).padStart(4) + " | ") + l.color_fn(l.code)).join("\n"));
    }

    detailed_table.push([" 📄 " + ansi.whiteBright(file_path), formatted_blocks.join("\n" + ansi.dim("      ⋮") + "\n")]);
}

if (has_untested_lines) {
    console.log(detailed_table.toString());
}