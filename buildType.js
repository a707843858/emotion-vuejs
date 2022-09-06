const path = require('path')
const {Project} = require('ts-morph')

const main = async () => {

    const project = new Project({
        tsConfigFilePath: path.resolve(__dirname, 'tsconfig.json'),
    })

    const diagnostics = project.getPreEmitDiagnostics()

    // 输出解析过程中的错误信息
    console.log(project.formatDiagnosticsWithColorAndContext(diagnostics))

    // 将解析完的文件写到打包路径
    await project.emit()

    // const result = project.emitToMemory()

    // 将文件路径打印到控制台
    // console.log(
    //     result._files.map((file) => file.filePath.slice(file.filePath.indexOf(outDir)))
    // )
    // console.info(
    //     `\nSuccess emit declaration file!\n
    // The project has generate ${result._files.length} typescript declaration files\n`
    // )
}

main().catch(() => {})
