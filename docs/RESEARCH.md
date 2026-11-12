# 抽屉上下文系统与九项架构核查

2026 年 11 月 7 日

[首页](../README.md) · [0.1 技术参考](../MGRS.md) · [原稿从哪里来](PROVENANCE.md)

我希望秘秘记得一个人平时怎么做事。可要是单独叫一个 Agent 来帮忙，它用得上之前聊过的哪几句？每次都把整段聊天搬过去，读起来费劲，也要花钱。想看这件事当时怎么想的，可以从[第 3 节的四个抽屉](#research-3)读起，或者直接看[第 5 节里关于压缩和成本的讨论](#research-5)。

这里保留了 11 月 7 日研究时的推理、比较和实现记录。下文的“当前”指当时选用的版本。要找某个判断对应哪段代码、当时实际查到了什么，可以从[第 12 节](#research-12)回去找。[GitHub 固定原文](https://github.com/mor765504-gif/Mimi-Superagent/blob/ad62b7f1301fa96474c160a7e58d2188785d7311/docs/research/2026-11-07-drawers-architecture-review.md) · [逐字归档](../archive/2026-11-07/docs/research/2026-11-07-drawers-architecture-review.md)

## 目录

- [0. 核查基线与结论](#research-0)
- [1. 九个问题的直接判断](#research-1)
- [2. 开源比较：复用机制，不替换事实权威](#research-2)
- [3. 抽屉不是四个数据库，而是四类本轮视图](#research-3)
- [4. 团队互相回报：在已有治理上补消费合同](#research-4)
- [5. 浮动上下文、压缩与 token 成本](#research-5)
- [6. Persona：保留双层表示，补正确加载与语境](#research-6)
- [7. Skill：已上线什么，如何复用新的能力](#research-7)
- [8. Profile 隔离、技能管理与前端接线](#research-8)
- [9. 复杂度和冲突：需要收敛的具体位置](#research-9)
- [10. MCP 延迟与单宿主 24 小时运行](#research-10)
- [11. 改造顺序与验收出口](#research-11)
- [12. 证据索引与访问边界](#research-12)

---

<a id="research-0"></a>

## 0. 核查基线与结论

本次读取的产品候选是 `mor765504-gif/Mimi-Superagent@a8c5bd8a860888e3fa082d3178f9c6f9c534716f`，即 PR #12 的 `release/mimi-rc-20261105`。查询时该 PR 仍为 Open Draft。主线为 `dd9ae5c0720f8db78ac953ac99a770295de844d6`。本记录单独从主线建立文档分支，避免把整个候选的产品变更一起带进文档 PR。[S01](#source-s01)

固定 Hermes 内核为 `c07501ec411b5364e5b12b7258c25a6a4c758545`。公共项目当前文档不自动等于该内核已支持或当前宿主已启用的能力。历史部署报告、当前源码和本次现场实测是三种证据；本次做了源码/文档核查，没有登录生产宿主、调用产品模型、跑性能基准或重跑 CI。

**推荐：保留现有运行架构，增加一个进程内、只读、可解释的 DrawerProjector，并明确 Persona、Memory、任务状态、Skill 四类信息的装配归属。不要另外接入一套 Letta/Mem0/Graphiti 数据权威、另一套 Agent Loop 或第二个压缩器。**

已有投影函数不等于没有抽屉。实际待修的是：当前自动记忆块按 scope 顺序和 subject_key 排序装入 2000 字符，缺少本轮相关性选择。它遇到放不下的记录是跳过继续，不是停止遍历。该限制是 Python 字符数，包含元信息，不是 2000 token。[S02](#source-s02)

另外三个重要事实：

- 当前候选的 `default` 与 `ai-daily` 会话库分开，但都被配置为读写同一 `shared` 记忆；这可能是有意共享，不是已证明的数据泄漏，也不是完全隔离。[S03](#source-s03)
- 独立宿主从公开中性模板构建 Persona，不能把这个模板的表现直接视为原有私人人格的能力。不同本地 Persona 目前可能触发冲突拒绝，不能靠覆盖文件绕过保护。[S03](#source-s03)
- 旧部署确有“学习产生 Skill、用户审批发布、主窗口发现并读取”的真实证据；不能重新描述为从未上线。但这不等于当前独立候选已继承所有装配，也不等于无限制开启 Hermes 自我改写。[S06](#source-s06)

<a id="research-1"></a>

## 1. 九个问题的直接判断

| 问题 | 现有依据 | 本次判断及改造方向 |
|---|---|---|
| 1. 多 Agent 团队回报是否可靠 | 原生委派、持久结果、版本化输入、依赖与工坊验收已经存在 | 不是重建治理。补查结果从持久回执进入指定接收者请求的全链；为已有结果增加可追踪的结论/证据/限定条件包 |
| 2. 浮动上下文是否省 token | 当前记忆自动块已经有小预算，Persona 有按需装配 | 相对全量注入可能省；相对现有 2000 字符块并不保证更省。应测完成同一任务的总 token、缓存费用、重试和延迟 |
| 3. Persona 能否更有人味 | 已有 JSON 人物卡、Prompt 编译器、场景示例和评测 | 先修正确人格加载与语境召回，再做情境回应。Humanizer 只是写作技能，不能替代人格和真实经历 |
| 4. 自动学习/复用 Skill 是否上线；UI 是否隔离 | 历史受审批发布与原生读取已上线；MCP 调用隔离有专项验证 | 区分历史部署、候选装配、自由自动改写三件事。已读前端清单不足以证明完整独立 Skill/MCP 管理界面已验收 |
| 5. Profile 污染是否严重 | session DB 明确分开，但 shared memory 同权绑定 | 无现场泄漏样本，不能评级“严重”。先把有意共享写成授权矩阵，再查记忆、摘要、技能、缓存、材料和子任务路由 |
| 6. 架构是否臃肿 | 单 ProductRuntime 组合多个业务模块，首页已瘦身；部分模块使用后常驻 | 模块多不是臃肿证据。优先消除重复状态权威、重复 Prompt、重复轮询和长期不释放资源，不拆成更多服务 |
| 7. 是否存在冲突套件 | 中性模板与私有人格、共享与隔离预期、技能自由写入与发布审批可能冲突 | 建立明确所有者和互斥装配规则；逐项验证冲突，不把潜在冲突写成已复现故障 |
| 8. 前端如何接后端 | 已有 /api/features、原生 SSE、身份代次、权威回读及部分组合验证 | 保留现有契约，以真实后端状态驱动 UI；新增抽屉/Skill 页面复用认证、命令回执和生命周期，不在前端建第二套任务状态 |
| 9. 好 Skill 怎么注入 Hermes | 固定内核已支持 skills_list/skill_view、外部目录；Humanizer 已在固定源码内 | 使用有版本的只读 Skill 发布视图和原生渐进加载；改写工具映射/治理边界，不整包注入全部元技能或引入第二个 Supervisor |

<a id="research-2"></a>

## 2. 开源比较：复用机制，不替换事实权威

这些是此次读到的机制，不是跨项目效果排名，也没有在秘秘上做性能复现。

| 项目/材料 | 实际查阅范围 | 值得借鉴 | 不直接引入 |
|---|---|---|---|
| icyaaaww/dsh-soul | 固定提交 index.js、src/memory.js | 小型投影、纠正与替代关系、交接入口、产物引用；投影与后台维护分开 | 600 字节不作为秘秘最佳预算；不把临时事件缓冲当可靠账本，不启动独立演化运行时 |
| wall1234567/dsh-rofm | engine/recall.js 的候选、排除、图扩展与概率逻辑 | 相关词候选、已入上下文项排除、保留通往其他记忆的关联 | 随机召回不能决定必需约束是否进入请求；不照搬另一套压缩/文件权威 |
| SurfCore | 已定位并读取 memory-card 的部分路径/维护实现 | 轻量提示视图与全量档案分开；按实际 sharing 边界投影 | 本次没有完整复核双卡衰减算法，不把“越旧越该忘”设为默认 |
| Letta | 当前 Memory & dreaming 文档；其当前路线是 Git-backed MemFS | 可查看的外部记忆、版本、按需展开和 memory doctor | 不让 MemFS 与 Core 同时成为可写事实权威；后台 dreaming 不是零成本 |
| Mem0 | 官方 README 的混合检索与集成说明 | 语义、关键词、实体结合的召回候选 | 首版不增加独立服务和每轮抽取模型；托管平台结果不能冒充 OSS 或秘秘实测 |
| Graphiti | 官方 temporal context graph 说明 | 有效时间、来源、替代旧事实而保留历史 | Core 已有的版本/有效期不重做；没有图查询需求时不增加图数据库 |
| MaiBot / Maisaka | 本轮讨论中此前已读的时序、表达选择与启发式记忆代码 | 交互时机、关联记忆自然拉起、可选表达候选 | 不迁移整套 HeartFlow，不把社交发言概率用于抑制明确任务指令 |
| LangGraph Supervisor | 官方 README 与消息历史管理方向 | 明确交接、结果转发、控制传给父代理的历史范围 | 不引入第二套调度状态机；官方 README 也建议多数场景直接用工具实现 Supervisor 模式 |

参考：[E01](#source-e01)至[E08](#source-e08)。dsh-soul 的 `projectionBytes=600`、秘秘的 2000 字符和模型 token 不是同一单位。此前讨论出现的“79.1% 对 16.0%”“1.5 倍内容”等数字未在本次建立适用实验依据，不作为改造承诺。

三个可选路线中，推荐 A：

- **A：现有 Core 上增加本地投影器。** 改动集中、没有新数据权威、可保持现有运行和压缩配置。最适合当前阶段。
- B：保留 Core，增加可重建的本地语义索引。只有词法/任务关联检索在真实样本明显漏召回时再加入；索引不是事实数据库。
- C：整体换入外部 Memory/Agent 框架。迁移权限、撤回、会话、发布和恢复成本高，本次没有证据证明收益值得。

<a id="research-3"></a>

## 3. 抽屉不是四个数据库，而是四类本轮视图

| 逻辑抽屉 | 内容 | 权威来源 | 更新与移除 |
|---|---|---|---|
| 常驻锚点 | 稳定且相关的少量偏好/约束 | 经授权的 Core 事实；人格核心仍属于 Persona | 显式修正、撤回、失效或策略版本变化；不是因很久没用自动删除 |
| 当前任务 | 目标、用户修正、当前依赖结果、未决问题、原件引用 | 既有 Orchestration、Core 与原生回执 | 随任务版本更新，完成后移出活动视图；不写成长久用户记忆 |
| 情境记忆 | 本轮话题相关的事实和真实经历 | 有来源、有范围的 Core/授权会话档案 | 随当前问题重新选取；旧事实不因表达流畅而变成当前事实 |
| 操作方法 | 与任务匹配的 Skill 名称、描述和已批准版本 | 原生 Skill loader + 既有发布服务 | 默认只展示目录；需要才 skill_view 加载正文/脚本/参考 |

完整材料和历史仍在现有档案/文件/数据库中。抽屉是可丢弃、可重建的工作视图，不是另一本账。工具可见目录也不是执行授权。

### 3.1 一条消息进入后的流程

1. 原入口先确定 owner/account/profile/session/task/seat 及授权代次，保留原 C1 身份链。前端或模型输入不能自报提升范围。
2. 保留原生会话历史与现有压缩结果。抽屉只处理本次追加信息，不另做一遍整段压缩。
3. 从当前用户消息、当前任务和必要的近邻指代语境构造查询。不要拿上轮自动摘要反复检索自己，形成自我强化。
4. 经现有接口读取已授权事实快照、当前任务状态和 Skill 目录。先做权限过滤，再做相关性排序。
5. 抽屉选择器产生结构化计划；它不调用模型、不写事实、不启动任务。
6. Persona 编译器/原生 MemoryProvider 在各自约定插槽输出，一份信息只有一个序列化所有者。记录已选 ID、版本、未选原因、预算和来源。
7. Hermes 执行原有模型/MCP/工具循环。必要的用户修正仍由现有 InputAdapter 可靠送达，不能被普通记忆排序裁掉。
8. 结果与消费证据回到原任务/会话系统。长期记忆写入、Skill 提炼和发布继续走各自现有授权路径，不因为投影器读取过就自动保存或发布。

### 3.2 计划的数据合同（提案，不是现有 API）

`DrawerPlan` 至少记录：schema_version、policy_version、owner/profile/session/logical_turn、authorization_generation、scope_revisions、task_revision、persona_revision、skill_manifest_digest、query_digest、selected_refs、omitted_reasons、token_estimate、valid_until、source_digest。

每个 `selected_ref` 包含 kind、stable_id、source_ref、source_revision、scope、rendered_text、required/relevance_reason。原始私密正文不默认写入诊断日志。公开源码和本报告均不包含用户会话、真实记忆库、凭据或生产原始回执。

缓存键至少涉及 owner/account/profile/session/task、权限代次、事实/任务/Persona/Skill 版本、策略版本和查询摘要。**相同 scope_revision 不能单独保证缓存仍有效：valid_until 可能已经到期，而过期过滤不一定产生新事件版本。** 每次请求仍保留现有有效性校验，缓存还必须检查最近到期时间与撤权代次。

### 3.3 选择算法

先硬过滤，再排序。首版用精确对象/路径/任务 ID、主题与关键词、当前任务关联、importance 和事实类型的时效性。中文需要实际分词或字词片段与别名处理，不能直接套英文空格分词。

必需项包括当前有效的明确任务约束、未消费的用户修正、执行依赖条件。它们由原任务输入机制保障，不是任意 fact 设置 pin 后无限挤入 memory block。必需项超过可用预算时，必须明确扩容到允许的总预算、分阶段执行或显示阻塞，不能悄悄丢掉。

可选项按相关性与信息增益选入；同义内容去重，冲突事实保留来源和适用时间。不能仅凭较新就覆盖权威较高的旧事实，也不能把模型猜测升级成稳定事实。

不采用 `exp(-距上次召回天数/90)` 作为通用遗忘规则。它会使长期未入选但仍重要的事实越来越难被选中。公平策略只在同等相关的候选之间平衡覆盖，不能为公平强行注入无关记忆。若增加召回统计，应区分 selected、request_included 与实际使用，不把同一轮多次工具循环计成多次独立记忆使用。

### 3.4 预算与格式

第一版继续遵守当前 MemoryProvider 的 2000 字符边界，修选择与紧凑编码；不要顺便改变全局压缩阈值。统一预算账本另记模型实际 token，以便之后做有依据的预算调整。

可使用紧凑行，但要保留或可回查 scope、subject、版本和来源，并转义换行/分隔符。示例只是格式说明：

```text
Memory view: partial; scope revisions are host-validated.
[work/default] preferred-output@v3: 使用简短结论后解释依据。 ref=memory:example
```

“不在抽屉”不等于“不存在”。提示模型这是一份选取视图，并保留原生 recall/资料读取入口。紧凑格式的真实 token 节省由 tokenizer 和样本测量，不能只数 JSON key 推断固定倍率。

### 3.5 接入位置

- `mimi_memory/provider.py`：继续负责授权快照、remember/recall/forget 和安全刷新；增加纯选择函数调用。当前 `_rebuild_prompt` 已存在，不另建第二个 Provider。
- `mimi_tavern`：仍是唯一选择的 ContextEngine，继承原压缩行为；负责 Persona 场景和最终请求插槽，不再重复塞一份 MemoryProvider 文本。
- `mimi_orchestration` 与 `mimi_progress`：提供任务与结果引用；不被抽屉的临时状态反向覆盖。
- `mimi_context_features.py`：配置具体 profile 的投影策略、允许读写范围和私有人格来源；不能通过同一个全局 latest-query 变量跨会话使用。
- 外置文件：保留当前材料及档案。新 `memory.md/context.json` 只能是带版本的派生视图；编辑后导入必须重新走 Core 验证/CAS，不能与 Core 双向无条件同步。

第一阶段不需要为 recall_count、last_recalled_at、pin 迁移事实表。投影策略可以来自版本化宿主配置，统计可由现有事件/诊断日志导出。若之后确需存储使用事件，再设计单写和幂等，避免每次“读记忆”都修改事实版本并制造 CAS 冲突。

<a id="research-4"></a>

## 4. 团队互相回报：在已有治理上补消费合同

现有工程治理包含固定输入/输出、read_set/write_set、独立 review、具名验收、原 run/epoch/checkpoint 接续；原生产品也有任务版本、attempt、输入消费与依赖推进。不能再把这些说成待建。[S10](#source-s10)

固定 Hermes 的后台委派本来就记录 originating session、完成结果与原始转录引用；部分失败通知和最终结果也是分开的。因此不要仅看到某个 Mimi notify 回调未设置，就断言整个产品没有结果回传。[S09](#source-s09)

建议在现有结果/产物合同中统一一个 **ResultCapsule**（提案）：

```text
task_id / requirement_revision / attempt_id / result_id
producer_profile / authorized_receiver / origin_session_lineage
claims[]: conclusion + evidence_refs + applicability + unresolved
artifact_refs[]: immutable ID + version/hash
constraints_checked[] / conflicts[] / next_dependency_refs[]
```

这是可审查的结论、依据与边界，不是复制 Worker 的全部聊天或内部推理。接收者先解析授权和版本，再读取必要原件。通过现有检查记录所用证据引用；模型自报“已读”不等于工具实际读取。

实际验收应分别观察：结果已持久化、按正确 session/role 路由、进入最终模型请求、有对应响应、接收者产物是否符合交接条件、依赖是否只释放一次。`step_observed` 证明响应关联，不证明理解正确。工程问题可以用测试/产物校验；研究判断则保留证据、冲突和有边界的人工/模型复核。

当前 HostPolicy 默认注册的 `native_summary_equals` 是窄验证器。存在 `c0_judgement` 或 `artifact_contract` 枚举不代表任意同名规则已经实现；需要实际注册的验证器。已有 Workshop 的冻结候选检查继续复用，不把 exact-string 比较当成复杂报告质量验收。[S08](#source-s08)

对话回报、工坊进度和通知应共享原结果标识，不能由三个模块各自重新总结、重新发送。原生后台完成路由与 Mimi 通知的去重归属需要在同一真实场景核验后决定，不靠再加一个 mailbox 服务解决。

<a id="research-5"></a>

## 5. 浮动上下文、压缩与 token 成本

用户已调好的配置作为基线继承，不擅自换模型、提高推理强度或修改压缩阈值。仓库历史评测确实记录 high/160K 与其他组合的取舍，同时明确合成样本、压缩后验证覆盖有限。因此该记录支持保留已选基线，不支持对所有任务宣称全局最优或无损。[S07](#source-s07)

还需核对新安装的真实配置是否继承旧实例的压缩/推理/记忆配置；代码和旧报告存在不等于新 profile 自动拥有同样设置。

浮动上下文至少有两项成本：减少重复信息可能省输入；每轮改写靠前 Prompt 可能损失前缀缓存。官方 OpenAI 文档强调缓存依赖相同前缀，因此应保留稳定系统/工具/Persona 部分，将变化的请求上下文置于支持的后部插槽；具体实现必须核对固定内核的实际 payload，而非凭 API 名字猜测。[E12](#source-e12)

测量单位是完成同一任务的总成本：

```text
总成本 = Σ(未缓存输入token×对应单价 + 缓存输入token×对应单价
           + 输出token×对应单价) + 检索/embedding/额外模型调用成本
```

另报总 token、p50/p95 延迟、重试次数、漏事实率、约束违背率和任务完成率。不能拿不同模型、不同行为完成度或一次较短回复比较“节省”。当前记忆块很小，改善相关性可能增加单次 token，但减少漏记、重查和任务重做；这仍可能是正确取舍。

同一逻辑轮默认稳定选择结果；但遇到授权、版本、到期时间或用户修正变化必须立即重新验证。权限失效绝不能为了缓存命中继续使用旧内容。

原始历史可回查与压缩摘要包含所有细节不是一回事。冷恢复需要 checkpoint、事件游标、原件引用和必要约束回读，不是无限扩大摘要。压缩后的新会话也应重新核对 Persona/Skill 清单及抽屉，而不丢失原逻辑任务身份。

<a id="research-6"></a>

## 6. Persona：保留双层表示，补正确加载与语境

Markdown/自然语言适合表达人物气质与示例；JSON 适合版本、场景、触发条件、预算与引用。保留当前编译思路，而不是把所有语言都变成 JSON，或给每轮叠加更多扮演说明。

首先增加明确的 Persona 来源选择：公共模板、用户本地配置、受管理团队配置分别有 manifest/hash。私有人格不进入公开导出；已存在的本地变更仍需显式导入/升级，不删除冲突保护。[S03](#source-s03)

人味改造以“同一人格正确理解当下对话”为目标：任务交代、玩笑、抱怨、纠错、收尾的回应不同；当前情境是短期推断，不能自动写成长久人物事实。相关经历要有真实来源。表达候选可以帮助变化，但不能替换当前立场、捏造共同经历、虚构已完成动作或硬塞固定语气词。

普通轮尽量由现有主模型一次完成理解和回应。已有可选 Planner 只在经测试确有收益的场景启用，不新增常驻情绪分析模型或每轮重写助手回答的第二模型。MaiBot 的交互时序放在渠道入口，非紧急主动发声放在既有事件/通知策略，明确用户任务与停止指令不得经过随机静默门控。[E07](#source-e07)

Humanizer 属于写作修改，可用于指定文稿、邮件或报告，保留原意、证据、引用与用户声线。它不负责人格身份、长期关系或任务完成事实。固定 Hermes 源码已经有 `skills/creative/humanizer/SKILL.md`，无需再安装同名副本。[S11](#source-s11)

<a id="research-7"></a>

## 7. Skill：已上线什么，如何复用新的能力

### 7.1 已有成果与待核边界

2026-10-01 的部署收尾记录明确：学习得到的 `hisho-meeting-materials` v5 经真实 Lark 绑定确认发布，重启后主窗口 `skills_list` 与 `skill_view` 成功、可用且无需 setup，读取自受管理发布视图。它不是只有 README 或单元测试的功能。[S06](#source-s06)

该路线限制 default 只读技能，避免 `skill_manage` 绕过发布治理。P6 已有 save/stage/approve/execute/recover、来源修订、场景观察与不可变版本，继续复用。[S05](#source-s05)

当前 standalone 的 CoreServer 构造处未直接传 `release_factory`，但这本身不能排除其他模块之后挂载。本次没有完成全宿主消费追踪，准确待核项是：新候选是否绑定相同发布服务、是否挂载批准的 view、是否能实际列出/读取/使用目标技能，以及真实工具清单是否允许自由改写。不能由内核具备自动学习能力推断上述四项已上线。[S04](#source-s04)

### 7.2 官方与社区材料的取舍

- OpenAI 公开的 Skill 是目录化说明、资源和可选脚本，配合 MCP 完成流程，不是模型权重或额外权限。当前读取到的 `openai/skills` 已标记 deprecated，指向 `openai/plugins`；后者公开插件/skills/agents/hooks 等示例。它不是 ChatGPT 全部内部系统提示词的完整公开。[E09](#source-e09)
- Anthropic `skill-creator` 提供写技能、测试触发、运行基线与评价的公开流程，适合借鉴技能验证方法；不是“复制一句提示词就复制 Claude 能力”。移植脚本前核对其工具和执行器依赖。[E10](#source-e10)
- 设计、写作与审核类方法由秘秘自己的 MGRS 工作流合同提供，不安装外部通用工作流插件，不给额外 Supervisor 调度权。具体规则见 [MGRS 原生治理规范](../MGRS.md)。[E11](#source-e11)
- Supervisor 复用评审方法和结果转发规则，不再带入 LangGraph runtime。最终控制权与 Worker 准入仍归现有 Mimi C0/Orchestration。[E08](#source-e08)

### 7.3 注入 Hermes 的推荐路径

首选路径：**版本化只读 Skill 包 → 既有发布服务批准的 per-profile view → 固定 Hermes 原生 loader → skills_list 元数据 → skill_view 正文 → 原 MCP/工具权限执行 → 原结果与回执。**

固定内核 `tools/skills_tool.py` 已支持 active profile skills 与 `skills.external_dirs`，同时支持项目目录优先发现和名称去重。因此需要测试同名项目技能覆盖批准技能的问题，使用规范名称、manifest/hash 和明确来源；不能只显示一个同名标题。[S12](#source-s12)

配置形态示意，路径为占位，不是可直接部署命令：

```yaml
skills:
  external_dirs:
    - /ABSOLUTE/APPROVED-SKILL-VIEW/FOR-THIS-PROFILE
```

`skills_list`/`skill_view` 本身仍必须进入当前宿主允许的工具集合；目录存在不等于可调用。脚本需要的执行权限单独声明，不从 SKILL.md 推导授权。不要为了读 Skill 打开同时带自由写入的整个 skills 工具包。

每个导入包保留 upstream repo/ref、原许可、内容摘要、入口/不适用条件、required capabilities、工具映射、适用 profile、测试样本与回滚版本。不同文件的许可证可能不同，不默认整个第三方目录可任意重发。

工程 Skill 中的 `spawn_agent`/delegate 等概念必须映射到现有受控派工，不允许 Worker 因技能要求递归开新控制者。Brainstorming 只在真正设计任务使用；直接执行已定计划时不要再启动一轮需求访谈。Humanizer 只编辑表达，不改写论点或验收状态。Supervisor 输出 findings/evidence/decision recommendation，不自己授予最终验收权。

技能学习可自动生成候选，但晋级遵循已授权的发布政策；高风险技能/脚本保留人工批准。自动收集经验、自动生成草案、自动安装生效是三个不同操作，UI 应分别显示。

<a id="research-8"></a>

## 8. Profile 隔离、技能管理与前端接线

### 8.1 Profile 矩阵

建立显式策略而非全部共享或全部割裂。建议主私人 profile 可读自己的稳定记忆和当前工作域；日报 profile 只读所需偏好，默认不写私人事实；团队 profile 只访问团队对象；Worker 只读任务必需上下文，长期记忆写入走原 primary/审批限制。

上述是提案，不能无迁移计划直接改变现有共享。用户可能有意让两个私人窗口共享偏好；需要以“允许共享的具体类别”表示，而不是因为共用数据库就拒绝协作。

污染检查覆盖：原生会话库、Core memory grants、Persona bundle、压缩摘要、Skill 外部目录与项目覆盖、MCP 凭据、浏览器/material handles、缓存键、后台结果路由、晚到响应。尤其是共享 owner/scope、不同 session 的缓存不得复用 query 与渲染状态。[S03](#source-s03)[S09](#source-s09)

测试至少有 A/B 两个 profile 独有哨兵、一个明确共享项、一次撤回、一次压缩/重启、一个晚到 Worker 结果。断言共享项按策略可见，私有哨兵不能跨域；不是简单断言“所有历史都不共享”。

### 8.2 Skill 与 MCP 管理应分开

MCP 页面管理连接、工具目录、授权范围、当前健康、延迟、重连和最近调用；Skill 页面管理 workflow、版本、来源、所需能力、启用 profile、验证和晋级。两者可共用导航/认证/审计组件，但 UI 的开关不能互相代替。

已有 MCP 专项验收证明了按调用隔离和首页按需加载，不足以证明完整独立 Skill 管理页已接通。已读功能清单显示 memory、connections、registry、workshop 等入口；没有据此确认完整的 Skill 安装/审批/回滚界面。因此该项标为“部分机制已证，独立管理旅程待验”，不是“全部没有”。[S13](#source-s13)[S14](#source-s14)

### 8.3 前后端合同

继续用现有 /api/features 与原生 Session SSE，不另做聊天 proxy。UI 发出命令包含既定 request key 与 expected revision，宿主补充可信身份；成功后权威回读。未知结果重查同一操作，不重新提交业务。

建议抽屉页面是只读解释视图：当前加载内容、来源/版本、预算、未选原因、可用的显式 recall。事实编辑仍走原 remember/forget；任务状态仍来自原调度。Skill 页面复用 P6 stage/approve/execute/readback，不调用客户端 shell 写目录。

必须展示区分：installed、configured、authorized、available、last_observed、last_used、tested_candidate。注册表中的“active”不是模型已验证可调用。源码中的 NativeRegistryDispatch 也明确只提供路由准入，而不是完整 P1 持久执行回执。[S15](#source-s15)

保留已接受的 session/generation/晚到响应保护；新增页面需覆盖身份切换、撤权、刷新恢复、未知副作用、关闭页面仍保留已接单工作。前端动作属于 view 生命周期，后台任务属于 ProductRuntime 生命周期。[S13](#source-s13)[S14](#source-s14)

<a id="research-9"></a>

## 9. 复杂度和冲突：需要收敛的具体位置

| 项 | 观察或风险 | 处理 |
|---|---|---|
| 公共 Persona 与私人 Persona | 新宿主构建中性模板，已有不同本地内容可能拒绝启动 | 增加显式来源/迁移合同，不关闭冲突检查 |
| shared memory 与隔离预期 | 两个 profile 会话隔离但记忆共享 | 按类别和操作设 grant，并验证允许共享与禁止共享 |
| Skill 自动改写与 P6 | 若直接启用 writable skill_manage，可能绕过现有发布流程 | 只读批准目录，草案另存，发布仍走 P6；先核实际工具清单 |
| 多个 ContextEngine/MemoryProvider | 直接安装其他记忆框架可能争夺同一注入和压缩权 | 保持唯一 engine/provider；采用 adapter 或纯 selector |
| 浮动 Prompt 与缓存 | 每轮改变靠前部分可能抵消少 token 收益 | 保持稳定前缀，记录缓存 token，验证最终 payload |
| 原生完成通知与产品通知 | 两条发送者可能重复回报；本次未证明已发生 | 统一 result/event ID，明确唯一外发归属，查回执后再改 |
| 页面卸载与任务执行 | UI 释放不能取消已接单任务 | 沿用既有生命周期合同 |
| 装配复杂度 | ProductRuntime 聚合多域；25 个普通模块首次使用后仍保留 | 提炼 mount/close/health 合同与资源归属；测常驻资源，不拆更多服务 |
| 历史控制面与产品控制面 | 开发 worker 的规程与产品 worker 机制相关但不是同一实例 | 保留现有工程成果，按当前产品入口补证，不把开发规则重新全局注入 |

第一版严禁以“统一”之名迁移所有数据库、重写 Hermes、删除旧证据、改变既有 Persona 内容、放开工具权限或修改压缩参数。

<a id="research-10"></a>

## 10. MCP 延迟与单宿主 24 小时运行

MCP 延迟分别测：进程/连接冷启动、工具发现、模型选择工具、Mimi 授权、RPC 传输、工具实际处理、返回模型后的下一轮推理。不能把整个任务等待归因于 MCP，也不能因复用 Hermes 就报一个未经测量的毫秒值。

当前 Core MCP 在启动时走原生 discovery，属同宿主代理路径。优先保留连接和 schema 缓存、明确 tool allowlist、按任务缩小模型可见工具；可选冷门服务再评估 lazy discovery。连接复用不意味着跳过逐次授权，工具 schema 缓存也必须随版本/权限变化失效。[S04](#source-s04)[S12](#source-s12)

做相同固定内核、同模型、同工具的 native-only 与 Mimi 路径对照，再分暖连接和冷连接。并发只用于独立的安全操作；长工具结果走既有异步回执，不在主对话等待期间重复初始化客户端。

Mac 源码已有本地进程启动、PID/启动时间身份校验、手动停止/重启和重连。最后窗口关闭会退出 App，但这并不足以推断子宿主必然退出或一定持续运行；更不能证明登录自启、系统重启恢复及 24 小时稳定性。[S16](#source-s16)

长期运行的建议是单宿主 service owner，按目标系统使用一个明确的进程监督入口；UI 可以连接/退出，已接单任务不随页面关闭丢失。保留唯一 writer/epoch/lease、已知进程身份、排队与 quiet 释放、未知副作用对账。空闲时以确定性事件/计时器等待，不让 LLM 反复检查“还活着吗”。

需补的运行证据包括：长时间空闲不消耗模型调用、断网恢复、进程崩溃后不重复执行、磁盘/日志满的行为、依赖积压、资源释放、通知重放、升级/回滚和备份恢复。单宿主不等于所有能力必须同 UID、同权限；有脚本执行的 Skill 仍需实际执行边界。无现场 soak，本记录不宣布 24 小时可用性达标。

<a id="research-11"></a>

## 11. 改造顺序与验收出口

### P0：版本与装配可观测

在现有状态/诊断入口读回真实 code/kernel/config/Persona/Memory/Skill 清单与 profile grants；核对旧部署 Skill 成果、已调压缩参数是否进入当前候选。不是新建第二本全项目验收台账。

出口：能回答“本次响应到底加载了哪个版本、哪些信息和哪些权限”，并复现一条真实用户输入到结果回读的路径。

### P1：只读抽屉投影器

保留 Core/schema/预算/压缩，先修 alphabetic-first 选择，加入查询、必要约束来源、紧凑格式、partial 标识、解释记录；不启用后台 LLM 抽取或随机记忆衰减。

出口：同一批样本上比较原排序、importance 排序、任务相关选择。覆盖拥挤记忆、长条目、中文指代、作用域饥饿、撤回/到期、改名不应改变重要性、同轮重建不重复注入。

### P2：团队结果消费与 Skill 受管复用

基于既有回执和工坊增加 ResultCapsule/消费可观察性；打通批准 Skill view 与原生 loader 的当前入口；明确只读使用、草案生成和批准发布。前端新增的按钮只调用既有命令/回读合同。

出口：A/B→综合者任务在补充、撤回、重启、旧结果晚到时保持正确版本；读到相关证据并产出符合合同的结果；Skill 安装/禁用/撤回/回滚具有真实消费回执，且不越权。

### P3：有人味与成本优化实验

固定模型/任务/样本，比较正确私人 Persona、加入相关经历、加入时序策略、加入表达候选的增量。再视实际漏召回决定本地语义索引，不先堆向量库。

出口：盲评回应是否贴合语境、人格是否一致、事实是否被篡改、是否产生虚构共同经历/错误承诺；同时报告完整任务 token/缓存费用/延迟。不能只用同一模型给自己的人味打分。

### 统一接受条件

- 权限、过期、撤回、任务要求和版本正确性不退化。
- 当前逻辑输入进入模型请求有实际追踪，复杂理解由产物与测试证明。
- 已存在的工程验收按原版本继承；本次新增影响范围单独补验。
- token 下降不能以漏信息、减少交付内容或增加人工补问为代价。
- 所有“未测/被阻塞/实际失败”分别保留。设计文档完成不等于上述运行验收完成。

<a id="research-12"></a>

## 12. 证据索引与访问边界

以下私有源码链接固定在本次读取的候选；不把本文件所在主线当成产品候选。

### 秘秘与固定内核

<a id="source-s01"></a>

- [S01 PR #12](https://github.com/mor765504-gif/Mimi-Superagent/pull/12)：读取时 head=a8c5bd8a，open/draft。
<a id="source-s02"></a>

- [S02 MemoryProvider](https://github.com/mor765504-gif/Mimi-Superagent/blob/a8c5bd8a860888e3fa082d3178f9c6f9c534716f/backend/deploy/hermes/plugins/mimi_memory/provider.py)：投影、2000 字符、刷新、recall 路径。
<a id="source-s03"></a>

- [S03 Profile/Persona 装配](https://github.com/mor765504-gif/Mimi-Superagent/blob/a8c5bd8a860888e3fa082d3178f9c6f9c534716f/backend/deploy/mimi_cli/mimi_context_features.py)：完整文件读取。
<a id="source-s04"></a>

- [S04 ProductRuntime](https://github.com/mor765504-gif/Mimi-Superagent/blob/a8c5bd8a860888e3fa082d3178f9c6f9c534716f/backend/deploy/mimi_cli/mimi_product_runtime.py)：本次重点读取启动段；其他挂载结合前轮源码核查，不宣称全面动态追踪。
<a id="source-s05"></a>

- [S05 P6 Skill 发布合同](https://github.com/mor765504-gif/Mimi-Superagent/blob/a8c5bd8a860888e3fa082d3178f9c6f9c534716f/backend/core/assisthub_core/skills_release/README.md)。
<a id="source-s06"></a>

- [S06 学习/发布/消费历史上线记录](https://github.com/mor765504-gif/Mimi-Superagent/blob/a8c5bd8a860888e3fa082d3178f9c6f9c534716f/backend/docs/evidence/2026-09-30-closeout-live-status.md)：采用顶部 10 月 1 日最终记录，不用下方早期未完成状态覆盖。
<a id="source-s07"></a>

- [S07 已有上下文调参报告](https://github.com/mor765504-gif/Mimi-Superagent/blob/a8c5bd8a860888e3fa082d3178f9c6f9c534716f/backend/deploy/hermes/persona/evals/REPORT-2026-09-26-context.md)：历史有限样本，不是本次跑测。
<a id="source-s08"></a>

- [S08 Gateway HostPolicy](https://github.com/mor765504-gif/Mimi-Superagent/blob/a8c5bd8a860888e3fa082d3178f9c6f9c534716f/backend/deploy/hermes/plugins/mimi_orchestration/gateway.py)。
<a id="source-s09"></a>

- [S09 固定内核后台委派](https://github.com/NousResearch/hermes-agent/blob/c07501ec411b5364e5b12b7258c25a6a4c758545/tools/delegate_tool_dispatch.py)：本次重点读取 1–220 行。
<a id="source-s10"></a>

- [S10 既有调度与实测记录](https://github.com/mor765504-gif/Mimi-Superagent/blob/a8c5bd8a860888e3fa082d3178f9c6f9c534716f/backend/docs/reports/2026-11-02-mimi-orchestration-v1.md)，以及前轮已核 C0-RUNBOOK/DISPATCH；保留各自证据范围。
<a id="source-s11"></a>

- [S11 固定内核 Humanizer](https://github.com/NousResearch/hermes-agent/blob/c07501ec411b5364e5b12b7258c25a6a4c758545/skills/creative/humanizer/SKILL.md)：名称/触发/前段内容及 MIT 元信息已读。
<a id="source-s12"></a>

- [S12 固定内核 Skill loader](https://github.com/NousResearch/hermes-agent/blob/c07501ec411b5364e5b12b7258c25a6a4c758545/tools/skills_tool.py)：本次读取前 190 行，包含 profile 目录、缓存与优先级。
<a id="source-s13"></a>

- [S13 MCP 隔离和首页生命周期验证](https://github.com/mor765504-gif/Mimi-Superagent/blob/a8c5bd8a860888e3fa082d3178f9c6f9c534716f/docs/plans/2026-11-04-mcp-lifecycle/VALIDATION.md)。
<a id="source-s14"></a>

- [S14 前端功能清单](https://github.com/mor765504-gif/Mimi-Superagent/blob/a8c5bd8a860888e3fa082d3178f9c6f9c534716f/docs/guide/FRONTEND-INVENTORY.md)：前 75 行。
<a id="source-s15"></a>

- [S15 原生席位/路由适配](https://github.com/mor765504-gif/Mimi-Superagent/blob/a8c5bd8a860888e3fa082d3178f9c6f9c534716f/backend/deploy/mimi_cli/mimi_registry_features.py)。
<a id="source-s16"></a>

- [S16 Mac 生命周期源码](https://github.com/mor765504-gif/Mimi-Superagent/blob/a8c5bd8a860888e3fa082d3178f9c6f9c534716f/mac/Mimi.swift)：启动、身份、重连和窗口结束路径；未做物理设备测试。

### 开源机制与公开资料

<a id="source-e01"></a>

- [E01 dsh-soul settings](https://github.com/icyaaaww/dsh-soul/blob/382d8072f057490bb83f23429b7bdf572a1bbcc9/index.js) 与 [memory.js](https://github.com/icyaaaww/dsh-soul/blob/382d8072f057490bb83f23429b7bdf572a1bbcc9/src/memory.js)：选择性读取源码，不采用未复核基准数字。
<a id="source-e02"></a>

- [E02 dsh-rofm recall.js](https://github.com/wall1234567/dsh-rofm/blob/main/engine/recall.js)：读取前 165 行；本次 blob SHA `3312e9ea7d48b93d4e46606f2d100b445b53d090`，main 是可变链接。
<a id="source-e03"></a>

- [E03 SurfCore memory-card](https://github.com/Mieksido/surfcore/blob/0ce8580048d3dddb21860114edb8b115d5d79d1e/plugins/surfcore/lib/memory-card.js)：只做部分代码核查，未据中文推广/教程评价性能。
<a id="source-e04"></a>

- [E04 Letta Memory & dreaming](https://docs.letta.com/configuration/memory)：当前官方说明采用 MemFS；不把旧 SDK memory blocks 文档当唯一现行架构。
<a id="source-e05"></a>

- [E05 Mem0](https://github.com/mem0ai/mem0)：官方 README 混合检索/OSS 与托管路线，未复现其基准。
<a id="source-e06"></a>

- [E06 Graphiti](https://github.com/getzep/graphiti)：官方时间/来源/混合检索设计，未引入其存储。
<a id="source-e07"></a>

- [E07 MaiBot 已讨论的记忆注入](https://github.com/Mai-with-u/MaiBot/blob/v1.3.19/src/maisaka/memory/heuristic_injector.py) 与 [表达选择](https://github.com/Mai-with-u/MaiBot/blob/v1.3.19/src/chat/replyer/maisaka_expression_selector.py)：延续本次会话前轮已读代码，不冒称本轮跑测。
<a id="source-e08"></a>

- [E08 LangGraph Supervisor](https://github.com/langchain-ai/langgraph-supervisor-py)：官方 README 推荐多数用例直接采用工具式 supervisor pattern。
<a id="source-e09"></a>

- [E09 OpenAI Skill 概念](https://developers.openai.com/plugins/concepts/skills)、[旧 skills 仓库](https://github.com/openai/skills)、[plugins 示例](https://github.com/openai/plugins)。
<a id="source-e10"></a>

- [E10 Anthropic Skill Creator](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md) 与 [Context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)：公开流程，不代表闭源产品全部内部实现。
<a id="source-e11"></a>

- [E11 秘秘原生治理规范](../MGRS.md)：MGRS 0.1，覆盖权限、上下文、团队交接、Skill 晋级和运行验收。
<a id="source-e12"></a>

- [E12 OpenAI Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)：缓存前缀原则；其他 provider 以其实际计费与缓存回执为准。
<a id="source-e13"></a>

- [E13 Hermes Skills 文档](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills/)：当前公共参考；落地兼容性仍以固定内核和实际装配为准。

没有复制生产凭据、真实会话或完整私人人物卡。没有修改源代码、现有计划/验收表、服务配置、数据库或部署状态。后续实施应回到原控制/验收入口，按已接受版本继承成果，只验证实际受影响的路径。
