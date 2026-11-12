# 仓库维护

[阅读指南](README.md) · [参与讨论](../CONTRIBUTING.md) · [原稿与来源](PROVENANCE.md)

MGRS 文档在 [GitHub 仓库](https://github.com/mor765504-gif/MGRS)维护。可以直接在网页编辑 Markdown 并提出 PR，也可以在本地编辑。

```sh
git clone https://github.com/mor765504-gif/MGRS.git
cd MGRS
```

修改后运行文档检查。需要 Python 3，可以离线执行。

```sh
python3 scripts/verify_archive.py
git diff --check
```

检查覆盖原稿校验值、章节与不变量数量、JSON 示例、本地链接及发布清单。新增文档需要更新[清单](../publish-files.txt)并补上阅读入口。有关实质修订和证据的说明见[参与讨论](../CONTRIBUTING.md)。

提交后，在 PR 的文件预览里查看读者实际看到的图表、段落和链接。[变更记录](../CHANGELOG.md)保存历次修订。[首次建仓脚本](../scripts/publish-github.sh)记录了这个公开仓库最初如何按清单发布，已有仓库通过普通提交与 PR 更新。
