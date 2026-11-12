# MGRS · Agent 一起做事时，哪些事要先说清楚？

我希望秘秘能陪一个人把事情做下去。比如你让它帮忙约一场读书会，它可以替你找大家有空的时间，准备阅读材料，写邀请。可同样一句「帮我约一下」，熟悉的同事之间可能已经默认可以直接发邀请，第一次联系的老师，你多半想先看看措辞。助手越能干，这点区别就越重要。原先只在你脑子里想了想的事，现在它真有可能替你做了。

MGRS（Mimi Governed Runtime Standard）是我从做秘秘的经验里整理出来的一套 Agent 治理框架。我把它写出来，也想听听别人怎么处理这些事。做个人助手、团队工作区和研究工具的人，碰到的情况大概会很不一样。[做秘秘的初衷](docs/MIMI-OVERVIEW.md)

<a id="governance"></a>

## 治理内核 · 人把哪些决定交给了助手

办读书会的时候，我愿意让助手自己决定先看日历还是先读邮件。要是连查资料的顺序都得我规定，请它来也太累了。但我说「先把邀请写好给我看」，要不要把它发出去，就还是我的决定。模型可以自己想办法，用户得有机会在事情影响到别人之前，把自己的意思讲清楚。

有些事你也可以提前交代好。假如你说过「组里每周的读书会，时间定好就直接通知固定成员」，助手就该能照办。可这回名单里多了一位组外老师，那份长期约定能管到哪里，就值得再想想。我希望用户平时可以放心少操心，想收回一项决定时也真的收得回来。

<a id="collaboration"></a>

## 协作合同 · 换一个 Agent，人的意思还得跟过去

假设读书会原定对外开放，材料已经找好了，你临时说「这次只在组内讨论，那篇还没发表的文章先放一放」。你自然会在原来的窗口里补这一句。可底下也许是三个 Agent 在干活，一个排时间，一个读材料，还有一个在写邀请。排好的时间可能还能用。写邀请的那个却得拿到新的名单和阅读单，否则组外的人还可能收到你刚撤下的文章。

我把这种交代叫作协作合同。分工时要说清楚这次要办成什么、各自能用哪些材料、谁会接着用自己的结果。换人时，读文章的助手交代一下选了哪几篇、为什么选、哪一篇还在等你决定，写邀请的助手就能继续了。没必要让接手的人从几百条聊天里自己猜。有时整件事就由一个助手来做，隔一周再打开窗口，也是靠这些交代把工作接上。[主对话和工坊](docs/002-architecture.md) · [交接时带走什么](docs/004-execution-and-evidence.md)

同一个道理也适用于人接手。假如你开会前打开手机，最想知道的大概是邀请写好了没有、还有谁在等你回话。把已经发出的邀请和等你过目的草稿放在各自该在的地方，你就知道哪件事还可以改。即使中间关过窗口，你也用不着重新问每个助手一遍。

<a id="extensions"></a>

## 专项扩展 · 同一个人，在不同场合要的东西也不同

我想让秘秘用久了能懂我。它可以记得我查论文时习惯看原文，跟我闲聊时也可以有点人味。可要是我请它代拟给老师的邀请，平时开玩笑的语气还合不合适？个人会话里知道的事，又有多少可以带进团队？这些取舍，得回到记忆、Persona 和资料共享各自的场景里谈。[上下文与记忆](docs/003-context-and-memory.md)

工作方法也一样。读书会邀请写得顺手，可以把做法留成 Skill，下次接着用。至于那份模板里以前写过的收件人，这次该邀请谁，还要看眼前这场读书会。对科研尤其如此。搜过什么、怎么找到原论文，是可以复用的方法。上次选的论文能不能回答这次的问题，得重新读。有人做的助手主要替团队处理客户资料，可能还有别的习惯和顾虑，很适合拿来一起讨论。[秘秘的搜索策略](docs/006-search-strategy.md)

<a id="discussion"></a>

## 我想先听听你们怎么做

有一处我还拿不准。你让助手替组员挑两篇入门读物，怎么挑、查哪些资料，可以交给它。可它读下来觉得第三篇才把问题讲完整，这时候是先交两篇，再附上自己的建议，还是可以直接改成三篇？如果「两篇」是你随口估的数，和你只给大家留了半小时阅读，答案可能就不一样。这里面，哪些判断你愿意长期交给助手，什么情况下又希望它先来问你？

如果你也做过或者用过类似的助手，欢迎把那句实际交代过的话带来。说说当时你以为它会怎样理解，换一种处理又会牺牲什么。这样的例子能帮助我们一起决定，哪些原则适合放进框架里，哪些应该留给不同产品、不同使用者自己选。[正在讨论的问题](docs/OPEN-QUESTIONS.md) · [参与共创](CONTRIBUTING.md)

MGRS 0.1 是以秘秘为起点的设计草案。历次取舍可查[设计决定](docs/DECISIONS.md)，需要按原章节查条款的读者可读[0.1 技术参考](docs/reference/mgrs-0.1-technical.md)。

<details>
<summary>按旧章节查 0.1 技术参考</summary>

- <a id="mgrs-1"></a>[第 1 章 · 宗旨、边界与禁止事项](docs/reference/mgrs-0.1-technical.md#mgrs-1)
- <a id="mgrs-2"></a>[第 2 章 · 六个治理面与唯一权威](docs/reference/mgrs-0.1-technical.md#mgrs-2)
- <a id="mgrs-3"></a>[第 3 章 · 十四条必须保持的不变量](docs/reference/mgrs-0.1-technical.md#mgrs-3)
- <a id="mgrs-4"></a>[第 4 章 · 请求级治理合同 ContextEnvelope](docs/reference/mgrs-0.1-technical.md#mgrs-4)
- <a id="mgrs-5"></a>[第 5 章 · 任务与团队交接合同 Task / ResultCapsule](docs/reference/mgrs-0.1-technical.md#mgrs-5)
- <a id="mgrs-6"></a>[第 6 章 · 统一任务纪律：不等于固定繁琐步骤](docs/reference/mgrs-0.1-technical.md#mgrs-6)
- <a id="mgrs-7"></a>[第 7 章 · 工具与效果等级](docs/reference/mgrs-0.1-technical.md#mgrs-7)
- <a id="mgrs-8"></a>[第 8 章 · Skill 生命周期与本土流程规范](docs/reference/mgrs-0.1-technical.md#mgrs-8)
- <a id="mgrs-9"></a>[第 9 章 · Persona 与人味](docs/reference/mgrs-0.1-technical.md#mgrs-9)
- <a id="mgrs-10"></a>[第 10 章 · Profile / Cache / 文件隔离](docs/reference/mgrs-0.1-technical.md#mgrs-10)
- <a id="mgrs-11"></a>[第 11 章 · 单宿主与持久恢复](docs/reference/mgrs-0.1-technical.md#mgrs-11)
- <a id="mgrs-12"></a>[第 12 章 · Web/Mac 管理界面与后端契约](docs/reference/mgrs-0.1-technical.md#mgrs-12)
- <a id="mgrs-13"></a>[第 13 章 · 可靠性度量与正式晋级标准](docs/reference/mgrs-0.1-technical.md#mgrs-13)
- <a id="mgrs-14"></a>[第 14 章 · 实施映射与分期](docs/reference/mgrs-0.1-technical.md#mgrs-14)
- <a id="mgrs-15"></a>[第 15 章 · 冲突裁决与变更控制](docs/reference/mgrs-0.1-technical.md#mgrs-15)
- <a id="mgrs-16"></a>[第 16 章 · 确认的已有能力与待证边界](docs/reference/mgrs-0.1-technical.md#mgrs-16)

</details>
