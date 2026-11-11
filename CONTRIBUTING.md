# 参与讨论与编辑

MGRS 是秘秘的专有治理协议，公开供开发者讨论与审查。可以在 [Issue](https://github.com/mor765504-gif/MGRS/issues) 中讨论规则，也可以用 [Pull Request](https://github.com/mor765504-gif/MGRS/pulls) 提交修订。[项目定位与许可](NOTICE.md)

## 从一个场景开始

例如，用户撤回了一份材料，但接手任务的 Agent 仍从缓存里引用它。读者可以指出涉及哪一章，说明这件事在哪个步骤发生、用户会看到什么结果，再给出措辞或实现上的改法。能复现的问题请附上版本和可公开的观察结果。修正错字、术语或链接，只写位置和改法就够了。

## 改哪一份文档

- [产品总览](docs/MIMI-OVERVIEW.md)和[编号导读](docs/README.md)面向第一次接触秘秘的读者。把设计放回用户的工作里讲，能用一个例子说清的地方，用例子。版本、运行记录和测量条件可以链接到 `docs/sources/` 中对应的材料。
- 权限、任务目标、验收条件等实质规则写在 [MGRS.md](MGRS.md)。提出调整时请说明会影响哪些人、工具或任务。[决定记录](docs/DECISIONS.md)和[开放问题](docs/OPEN-QUESTIONS.md)可以帮助定位已有讨论。
- [研究全文](docs/RESEARCH.md)保留当时的分析。[归档](archive/README.md)保存逐字原稿。后续发现可在编辑版或带日期的来源页说明，读者仍能与原稿对照。

## 提交前检查

在仓库根目录运行下面的命令，检查归档校验值、规范结构、合同示例、本地链接、锚点与发布清单。

```sh
python3 scripts/verify_archive.py
```

新增文件请加入 [publish-files.txt](publish-files.txt)，并从合适的阅读入口链接过去。涉及条款、来源或阅读路径的改动记入 [CHANGELOG.md](CHANGELOG.md)。[维护说明](docs/PUBLISH.md)
