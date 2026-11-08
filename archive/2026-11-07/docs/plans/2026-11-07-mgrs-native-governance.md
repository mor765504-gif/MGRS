# MGRS 0.1：秘秘原生 Agent 治理标准（设计候选）

日期：2026-11-07
状态：设计候选，未实施、未部署、未经过本规范的端到端验收；不改变当前用户决定或历史成功证据。
适用对象：Mimi ProductRuntime、Hermes 固定内核、Core、mimi_memory、mimi_tavern、mimi_orchestration、Workshop、Skill P6 发布、Web/Mac/外部渠道。
研究基线：Mimi-Superagent PR #12 的 `a8c5bd8a860888e3fa082d3178f9c6f9c534716f`；内核 `c07501ec411b5364e5b12b7258c25a6a4c758545`。本文件保存在 PR #14 的独立文档分支，不与 PR #12 一起合并。

## 1. 宗旨、边界与禁止事项

MGRS 要解决的是单入口、长期会话、可分工的多 Agent、MCP 与 Skill、私人/企业资料、Mac 单宿主持续运行之间的**协作可靠性**，而非用另一套通用 workflow 框架替换 Hermes。

四个结果目标：
1. 任务、结果、实际外部作用能够追溯到授权主体及确定版本。
2. Agent 在正确的时刻取得必要上下文和技能，不依赖全量重复注入。
3. 宿主中断、上下文压缩、会话切换、后继 Agent 接班都不把未知伪装成成功或重复执行。
4. 普通聊天与小任务低开销，高风险效果与复杂交付具有相称的约束和可独立核验依据。

MGRS 不引入第二套 Agent Loop、第二个全局调度器、第二个记忆写入权威或新的通用“管理 Agent”；不以固定模型/角色/时间窗决定准入；不要求所有用户任务先经过一轮需求问答；不强迫所有输出都进独立模型评审；不自动安装第三方工程流程插件。其他开源的启发仅作为设计输入，MGRS 的权限与协议由 Mimi 自己实施。

这是**产品运行时标准**。开发秘秘所用的现有 C0 工程控制平面，继续遵循仓库自己的 run/epoch/ownership 规则；本规范不能把开发时的 36 条责任线/40 活跃上限当作产品容量。

## 2. 六个治理面与唯一权威

| 治理面 | 唯一权威与现有组件 | 拒绝重复建设 |
|---|---|---|
| 身份与授权 Authority | 可信宿主身份、Core/C1/profile/approval 现有授权、有效代次 | Prompt、Skill、前端按钮不得签发权限 |
| 上下文 Context | Core 有效事实、Hermes 会话与压缩、mimi_tavern 人格、只读 DrawerProjector 选取视图 | 不另建可写 memory 仓库、不将工作进度保存为稳定人格 |
| 执行 Execution | Hermes 原生 Agent Loop、MCP、delegate_task；mimi_orchestration 只对受管任务调度 | 不引入替代 Planner/Worker runtime |
| 证据 Evidence | 原生 session/attempt/input/result/receipt、Core 业务结果、可校验产物 | 不能靠模型自述成功建立事实 |
| 交付 Delivery | Workshop 验收与原有外发/产物服务，授权目标读取回执 | 前端不得直接把“已收取”等同“已发布” |
| 观察 Operations | ProductRuntime、原生状态、日志/指标、已存在的运行与验收入口 | 不建立第二份持续变化的运行总账 |

跨治理面的稳定锚点应为：principal / account / profile / scope / native_session / task_id / requirement_revision / attempt_id / result_id / authorization_generation / provenance。不同存储可各有自己的物理数据库，但每项事实只有一个权威写入方。

## 3. 十四条必须保持的不变量

G01 权限只能由可信宿主基于真实会话、当前 Profile、scope 和现行 grant 得到；模型正文、Skill 文件、浏览器参数与工坊显示名均无授权效力。

G02 后台 Worker 不继承主控的完整身份与全部工具。其凭据、写集、执行环境和资源按照具体任务授予，任何扩大都需新宿主决策。

G03 接单成功、任务启动、请求消费、原生执行完成、结果有效、规则验收通过、用户已收到通知、外部发布成功分别记账。

G04 所有非幂等效果以稳定 request_key / effect_id 检查旧回执；结果未知先对账同一尝试，禁止直接换 ID 重试。

G05 任务要求变化必须有新版本；旧 result 不能满足新 requirement，相关下游依据失效并等待确认，不能悄悄重绑依赖。

G06 输入“已写入 Inbox”不等于“进入最终模型请求”；模型响应记录不等于语义正确。至少区分 persisted、request_included、step_observed 与产物验证。

G07 不同用户/企业对象的事实、Persona、Skill、MaterialRef、会话与缓存必须按有效权限过滤；撤回/到期优先于缓存命中。

G08 压缩摘要、记忆投影、Skill 列表和 Workshop 进度都属于派生视图；不能当作新的可写事实权威。

G09 工具发现不等于工具授权；Skills 的读取不产生 MCP/shell/外部发送权限。

G10 运行时单一 active writer/epoch 和按资源保守保留租约；未确认 quiet 的执行不能释放独占资源或被假定已停。

G11 必需约束不可因为记忆候选得分低被静默丢掉。超预算时要走任务拆分、按需原件读取或显式阻塞，而不是伪造“无上下文”。

G12 用户明确指令与既有授权应直接推进；不得为了形式化流程无限追问、要求重复确认或另开 Planning 轮次。需要确认的高风险效果沿用现有审批。

G13 纯文档、测试夹具、受控候选、真实模型验收、实体设备验收、生产运行是不同的证据层级；未知保留 UNKNOWN。

G14 所有治理状态必须对失败与恢复负责。关闭前端或更换模型不是重置 run、授权、结果或失败历史的理由。

## 4. 请求级治理合同 ContextEnvelope

原则：可信入口绑定身份，信息由现有真实来源提供，抽屉是只读计算结果。

推荐逻辑结构（仅拟议合同，不是现有 API）：

~~~json
{
  "schema": "mgrs-context/1",
  "identity": {
    "principal_ref": "host",
    "profile_ref": "authorized-profile",
    "session_ref": "native-session",
    "authority_generation": 0
  },
  "turn": {
    "logical_turn_id": "host-turn",
    "task_id": null,
    "requirement_revision": null,
    "query_digest": "sha256"
  },
  "sources": {
    "memory_scope_revisions": {},
    "persona_manifest_digest": "sha256",
    "skills_manifest_digest": "sha256",
    "task_result_refs": []
  },
  "selection": {
    "required_refs": [],
    "selected_optional_refs": [],
    "omitted": [],
    "rendering_digest": "sha256"
  },
  "budget": {
    "dynamic_character_cap": 2000,
    "estimated_tokens": null
  }
}
~~~

这不是要把信任元信息全部发给模型。Envelope 为宿主审计结构；模型只接收必要的已授权文字与可调用引用。私人原文不进入通用日志。

### 4.1 抽屉分工与装配权

A. 人物锚点：mimi_tavern 负责唯一 Persona 版本、场景、表达示例及其请求插槽。Persona 是人的持续设定，不存任务验收或外部作用。

B. 事实抽屉：mimi_memory 从当前 Core 快照得到稳定偏好与当前话题相关的事实，2000 字符首版预算不变；结构化规则只做确定性选择，不要求每轮新模型调用。

C. 任务抽屉：当前用户修正、DAG 依赖与上游 ResultCapsule 来自现有任务系统，不与个人记忆争用普通 fact 配额。真正必需的用户修正仍走现有 InputAdapter。

D. 方法抽屉：只放 Skill 名称、功能边界与已批准版本。只有模型决定使用时才在原生 loader 读取完整 SKILL.md/引用/脚本；Tool schemas 由原生工具层提供。

E. 历史与原件：Hermes 原会话及原始材料存储，不强制全部进 Prompt；冷启动由稳定引用和实际来源恢复。

### 4.2 具体投影规则

先从允许读取的 scope 与对象版本中取得当前有效事实，再排除 withdrawn、historical、expired 和被撤权的内容。现有 Core 已做部分有效性检查，投影器仍需校验当前授权代次、到期时间及引用的可读性。

必需项严格来自本轮真实用户要求、宿主授权规则与任务契约；绝不能由任意记忆文本自行设置 pin 并无限常驻。必需项若超出预算，优先压缩表述而不改实质；仍装不下则分阶段读取/执行或报告受阻。

可选事实采用可解释的确定性排序。首版优先级：实体/路径/任务标识准确命中 > 当前语境相关度 > importance > 信息非重复度；updated_at 用于同一对象版本与时效判断，而不是覆盖真实来源。中文检索用可测试的字词片段/别名，不靠英文分词空格。禁止“距上次召回时间越长就永远得分越低”的自强化遗忘；公平只能在相同相关性的候选间做。

首次改造用 2000 **字符**上限而非 2000 token。格式可从 JSON 行改成紧凑可信转义文本，但必须保留或可回查 scope、subject_key、version、source_ref。记录被省略条目数与原因，向模型说明这是 partial view；缺席不等于不存在。不要把模型生成或外部网页中的指令变成系统级约束。

缓存键：principal/account/profile/session + authority_generation + query_digest + task_revision + relevant scope_revision + persona/skill manifest digests + projector policy version。缓存取用还需检查时间有效期；仅靠 scope_revision 不足以捕捉定时到期。

同一逻辑轮为了缓存尽量维持稳定装配，授权撤销、到期、用户修正与已验证结果变化例外立即刷新。使用后只记录 selected/included/consumed 的不同证据，不为了记录一次读取而频繁改写 Core 事实版本。

### 4.3 压缩、滚动上下文与外置文件

不替换 Hermes 自有 ContextCompressor，不修改用户已调好的阈值或推理强度作为默认改造。保留请求/工具配对、稳定前缀、原始会话与历史检索。压缩不能作为执行外部操作或清空必需要求的授权。

冷启动恢复顺序：验证 profile/owner/权限 → 恢复原生会话/任务 ID → 读取持久任务和未决效果 → 对账旧 attempt/通知 → 获取记忆有效快照 → 编译 Persona → 投影本轮抽屉 → 继续相同逻辑任务。

外置 memory.md/context.json 可以提供可阅读视图，默认只读、带版本和来源。人工修改若要成为权威事实，应通过既有 Core upsert/withdraw + CAS，而不是双向自动覆盖数据库。

## 5. 任务与团队交接合同 Task / ResultCapsule

受管任务至少绑定 goal、context_refs、result_rule、execution_profile_ref、environment_ref、resource_claims、dependency edges；沿用现有 submit_plan/amend_task/append_context。不要将开发控制台的 C0 角色硬编码成所有消费者的身份。

每个可消费结果增加规范的“结论胶囊”投影，优先使用现有结果/材料字段，不立即增设第二套数据库：

~~~json
{
  "schema": "mgrs-result/1",
  "task_id": "T",
  "requirement_revision": 1,
  "attempt_id": "A",
  "result_id": "R",
  "producer_profile": "bounded-worker",
  "authorized_receiver": "resolved-by-host",
  "conclusions": [
    {
      "claim": "text",
      "evidence_refs": ["material:versioned"],
      "applicability": "scope or condition",
      "uncertainty": "unresolved issue if any"
    }
  ],
  "artifact_refs": [{"ref": "immutable-or-versioned", "digest": "sha256"}],
  "conflicts": [],
  "unresolved": [],
  "next_dependency_refs": []
}
~~~

必需字段的内容由实际已执行结果产生，不能用生成的 JSON 自动授予 verified。接收方检查授权、任务版本、结果有效性，再读取必要证据原件。一个接收方的上下文窗口不必复制全部上游聊天。

四个回报层级：
- Durable: 结果已持久入账，属于正确 attempt。
- Routed: 路由到正确授权接收者，会话标识可追溯。
- Consumed: 已包含在最终模型请求并观察到相应响应；仅证明确实被送达。
- Accepted: 后继产物满足已声明的具名检查，冲突与未解决问题按合同保留。

不能把前三级自动晋级为第四级。复杂研究/财务结论的接受标准依赖该任务自己的证据与复核规则，不由固定 exact-summary checker 代替。对 Worker 自我评价和独立验收分开记账。未知原生效果或缺失凭据的失败保持受阻，不无限重跑整包。

## 6. 统一任务纪律：不等于固定繁琐步骤

普通请求依既有授权直接执行，不要求先展示计划或先提问。复杂、依赖较多或后果较大的任务，主控先给出可检查的任务合同；任务能独立并行则由宿主准入，不因“必须凑多 Agent”而增加 Worker。

拟议任务阶段不是新数据库状态机，而是对既有状态的语义约定：

- Determine: 判定用户具体目标、必要权限、结果条件；仅在缺信息确实影响行动时询问。
- Contract: 对多步骤任务保存唯一任务、依赖与版本；独立写集、资源、角色绑定明确。
- Execute: 原生 Hermes 运行并持续生成可观察回执。
- Reconcile: 旧执行未知先查原生事实；补充消息绑定当前版本并证明请求消费。
- Accept: 用任务适当的原件与检查验证产物；普通阅读不额外引入高成本复核。
- Deliver: 通过原业务接口与 UI 投影交付；成功、已接受、已外发必须分别描述。

单人普通写作可以简化为 Determine → Execute → Deliver。跨系统高风险动作必须保留 Contract/Reconcile/Accept 中相关的检查。不存在“没走满六步就不能交付”的人为形式门槛。

审阅者独立于生产者对同一结果作评价，但不必给每一个低风险消息常驻第二模型。审核证据是执行记录/材料/测试，不是主控对 Worker 的印象。

## 7. 工具与效果等级

风险是宿主/功能契约定义的效应分类，不从模型的自然语言标签推导。将工具 effect 分为：

| 类别 | 示例 | 必要约束 |
|---|---|---|
| E0 只读 | 查询、检索、查看本地状态 | 当前 ACL + 数据来源/时间；允许自动使用 |
| E1 有界可逆 | 写入草稿、修改可撤回的个人事项 | 明确用户目标及已授权范围、版本/回执、可逆路径；不额外机械确认 |
| E2 对外或难逆 | 发送邮件、发布 Skill、更新共享外部目标 | 当前明确指令或符合原有审批的授权、精确目标、幂等、效果对账 |
| E3 高权限 | 生产系统/敏感凭据/跨租户或其他高风险操作 | 现有更严格的可信批准流程、能力边界及独立回读 |

同一 MCP Server 可含不同级别工具，不能以“安装这个 MCP”一次性放行所有权限。前端显示“已配置”和模型能发现这个工具都不等于执行授权。原有 Core/工具/approval 的细粒度检查仍是执行门禁。

延迟优化不得删去逐次授权或对不确定外部效果的读回。按 discovery、连接冷启动、权限、RPC、真实处理、模型选择/回合分别记录延迟；比较同模型、同工具、同网络下的暖/冷基线。缓存可以保存不敏感 schema，不缓存已经撤销的能力。

## 8. Skill 生命周期与本土流程规范

目标是让秘秘“自然复用成熟技能、自动形成候选”，不是无审核自由改写自己的工具执行权。

Skill 生命周期：DISCOVERED → CANDIDATE → TESTED → STAGED → APPROVED → ACTIVE；可进入 DISABLED、QUARANTINED、REVOKED。这里只是治理语义映射，不要求新增一套与 P6 状态并行的持久表。现有 Skill P6 的 save/stage/approve/execute/recover 继续是发布权威。

每个 Skill 包必须有：标准名称、来源与固定版本、原许可、入口/适用场景、非目标、依赖能力、预期输出合同、拒绝与失败条件、最小正反例、回滚来源。带脚本的 Skill 必须另外声明执行能力；纯 SKILL.md 不生成 shell/MCP 权限。

Mimi 原生技能分三个可复用家族：

1. 探索与设计：面向用户还在探索方案的请求，支持提出选择、比较风险和形成决策，但不要求所有工作都先进入固定的多轮访谈。
2. 表达与编辑：保留原意、事实强度、声音和可核对来源；明确区分稿件 humanize 与秘秘人格运行，不在每轮对话强制调用第二模型润色。
3. 审核与交付：对明确任务合同检查执行证据、例外、回执和受影响边界；不允许技能自己任命第二个 C0，不把 reviewer 结论直接转化为最终发布权。

加载链：已批准的 per-profile 只读 view → 当前 Hermes 原生 skills_list/skill_view → 原生工具权限判断 → Core/Workshop 的现有结果记录。Skill 发现名/描述能否被看到、正文能否被加载、脚本能否执行、结果是否可靠是四个独立观察项。

自动学习分为捕获经验、形成候选、离线测试、批准/晋级与运行消费。即使 Hermes 上游提供自动学习入口，在 Mimi 启用前仍需检查是否走受管 view 和发布服务。上游自由 skill_manage 与 Mimi P6 批准机制不得同时拥有同一目录的写权。

## 9. Persona 与人味

mimi_tavern 保持唯一 ContextEngine 人格装配者：Persona JSON 管版本、语境适用、示例引用和预算；自然语言管理声音、语气和身份。用户私人人格应有独立受管理来源选择，不把中性公开样板当成真实私有人设，也不为了修复装配而覆盖未经迁移的本地配置。

“人味”主要测交互是否正确：对话目的、玩笑/纠错/抱怨、实际共有经历、任务失败后的沟通和关系连续性。记忆召回的准确性与文风多样性分开评价。不能因为一句话好听就允许虚构共同经历、未经授权承诺或假称任务已执行。

表达候选可以由本轮已授权上下文选出；默认不常驻第二个情绪分析模型。用户实际问工具状态时直接报告，不强制情绪表演。不同 Profile 可以使用同一角色的不同工作切面，但能力授权和数据权限不得由这种角色描述放宽。

## 10. Profile / Cache / 文件隔离

Profile 合同分别声明 session 数据库、memory grant、Persona 来源、技能目录、MCP capability、材料对象域与子 Agent 派生边界。对确有业务价值的共享偏好采用显式 grant，不将独立数据库误写成全部内容隔离。

已发现的实际基线：候选中 default 与 ai-daily 使用不同原生 session DB，但都存在相同 shared memory 的读写绑定；这属于需对照目标的配置选择，不是本轮已复现泄漏。

必须检验：两个 Profile 独有记忆哨兵、一个允许共享项、撤回后同轮/下轮刷新、过期时间跨越、压缩/冷启动、项目同名 Skill、跨 profile 执行拒绝、晚到 Worker/通知不可串会话。未经实际测试不报告污染率。

## 11. 单宿主与持久恢复

ProductRuntime 负责组件装配与关闭顺序，Hermes 原生运行执行循环，Core 保持业务事实，Orchestration 管受管任务状态。即使 Mac UI 窗口退出，宿主服务与已接任务的存续规则也需要明确配置，不允许用界面是否打开判断任务完成或资源释放。

运行前验：单实例 writer、当前 epoch、数据库及 socket 可读写、当前 native profile、必要核心能力、可恢复未决效果。不能因为健康端点 200 就宣称真实工具准备就绪。

运行中：主循环事件驱动，闲置不反复唤醒模型；持久任务排队；守护/重连/断网恢复；停止需要原生 quiet；日志/磁盘压力进入可恢复的降级状态；外部效果未知先对账。

重启时：先恢复事实与授权，再重建引用与原生路由，观察旧 attempt，处理未决通知与任务；不得把旧 session 重新建成新的同效任务。升级/回滚不删除历史回执或撤回记录。

真实 24 小时验收需要规定观测工作负载和设备状态。只有运行后才能报告持续运行可用性，不能以源码里存在 restart/health 推导已经稳定 24 小时。

## 12. Web/Mac 管理界面与后端契约

使用现有 /api/features、原生 session SSE、信任宿主身份、命令回执和权威回读。所有管理页有清晰边界：

- Memory/抽屉页：只读查看本轮选择、真实来源、预算、未选原因；事实写入仍用 Core recall/remember/forget，不让 UI 直接改 derived JSON。
- MCP 页：连接、当前权限、工具发现、服务健康、性能与最近调用；配置不等于授权。
- Skill 页：来源、版本、能力依赖、测试、stage、批准、active/revoked；不借 Skill UI 修改 MCP 权限。
- Workshop 页：task/attempt/dependency/results/verification/claim/recovery；不能用 view 关闭取消已接工作。
- Persona 页：私有人格来源与切面、实际加载版本、受控迁移与回滚；不触碰记忆写入授权。

共同的 UI 状态至少区分 unavailable、unconfigured、unauthorized、pending、running、unknown-effect、verified、delivered 和 stale；映射既有业务状态而非在前端编造另一套业务状态机。状态都需显示最后来源/版本/观测时间。

新增页面必须覆盖身份切换、迟到网络响应、失败保留草稿、撤权即不可见、刷新恢复、独立暗色/窄屏、页面释放不干扰持续任务。不能由静态 screenshot 宣称真实用户旅程通过。

## 13. 可靠性度量与正式晋级标准

必须报告分母、样本版本、模型/配置、观测时间和失败实例。指标包括：

- 任务：有效/验证/实际交付分布，未知结果比例、重复执行、冷恢复后已接任务丢失率。
- Context：必要约束覆盖、相关记忆 Recall@K、无关注入率、被撤回/过期注入次数、跨 profile 泄漏。
- 团队：结果持久到授权接收、进入实际请求、响应观察、下游产物接受的漏斗；交接耗时与遗漏证据条数。
- Tool/MCP：冷/暖调用 P50/P95、授权占比、工具发现延迟、超时/重连、重复初始化次数。
- Persona：情境回应盲评、人设漂移、重复口头禅、虚假共同经历、没有回执的完成承诺。
- Skill：已发现→已读取→实际使用→验收、触发漏报/误触发、版本回滚和越权拒绝。
- 成本：整任务输入/缓存/输出 token、额外检索与辅助推理、成本、P50/P95 响应、任务质量与重试。
- 运维：真实设备/环境下故障恢复、空闲模型调用数、CPU/内存/存储占用、24h 稳定运行证据。

安全和事实完整性为硬门禁：受控负面用例发现越权信息、撤回记忆再注入、伪造已交付、重复不可逆外部作用时不得发布对应能力。普通质量指标按历史现行基线和测试集比较；本文件不凭空给出全局 p95 毫秒或百分比门槛。单纯节省 token 但增加漏事实和重试不算改进。

证据分层：SOURCE_PRESENT（代码在）、CONFIGURED（已配置）、CONTROLLED_PASS（受控验证）、PROVIDER_PASS（真实模型）、DEVICE_PASS（真实客户端）、PRODUCTION_PASS（生产实测）。一个层级不自动推导下一个。允许 NOT_RUN/UNKNOWN，不强制给所有未做的项目打 FAIL。

失败场景至少覆盖：冷启动重复派工、修改到达与模型请求同时发生、Worker 结束但通知失败、旧回执晚到、Core 快照读取部分失败、权限在请求组装后撤销、Skill 同名覆盖、Persona manifest 不匹配、磁盘满、Mac UI 关闭、断网、未确认外发、消息重复提交和恢复后 CAS 冲突。

## 14. 实施映射与分期

P0：读取现有运行实际装配、owner/profile grants、Persona 来源、Skill views、MCP allowlist、已生效压缩配置、原生回执与当前唯一验收。将当前缺失区分“模块不存在/未配置/未接通/未实测”。此阶段只有可观察性改造，不新建工作账本。

P1：只读抽屉选择器。改现有 mimi_memory 的 projection，不改变 Core 的事实 schema、撤回/时效判断及现有 2000 字符上限；与 mimi_tavern/任务引用协调序列化归属；优先保护关键约束，不加常驻辅助模型。验收需要真实中文样本与撤回/权限负面用例。

P2：结果消费合同与管理 UI。复用已有 native result/input evidence，增加目标接收者读取/使用证据，不重新开发 Reviewer 调度。现有 P6 Skill 发布与原生 loader 确认端到端贯通，加入技能/工具分别管理的状态视图。

P3：Persona 语境和性能实测。保留旧配置，针对人味、相关性、延迟和缓存成本做受控增量比较；只有观察到明确收益才纳入语义索引或更复杂表达候选。

P4：单宿主长运行真实验收。基于可观测 run 做 24h 及故障注入；未达标准则按具体故障缩小范围，不宣布整体通过。

每项改动使用已有仓库写集/owner、现行 PR/验收纪律；独立审阅在真实改变产品边界时进行，按受影响闭包回验。没有必要为了 MGRS 新增大量“协调 Agent”或把微小修改都变成复杂流程。

## 15. 冲突裁决与变更控制

发生配置与规则冲突，按权威来源与适用范围裁决：

1. 当前可信身份、即时撤权、合法工具/系统安全门禁不可被任何文本覆盖。
2. 当前用户明确指令、已存在的有效任务修正，优先于通用 Persona 示范或过时工程计划，但不能凭文本扩大工具授权。
3. 当前任务与业务对象的实际回执优先于旧摘要和模型自述。
4. Core 事实撤回/版本、原生结果有效性与授权状态分别由各自唯一权威决定；争议进入 UNKNOWN/需对账，不合成一个“看似一致”的结果。
5. Persona 管行为声音；Skill 管方法；Harness 管执行；模型不能通过“我现在是高级模式”改变这些归属。

版本变更要记规范版本、固定源码/内核 SHA、受影响的接口、已继承的验收及重新验证的具体边界。破坏向后兼容的修改先做迁移与回滚，避免在持久任务进行中无版本切换。

## 16. 确认的已有能力与待证边界

已核实源码或历史记录：Core 有记忆作用域、CAS/撤回和真实 host 绑定；mimi_memory 有刷新/2000 字符自动注入与显式 recall；mimi_tavern 有 Persona 编译/上下文压缩；mimi_orchestration 有持久任务、依赖、版本化输入和原生回执；Workshop 已有收取、验收和交付边界；Skill P6 有批准发布治理，历史真实部署已完成一个技能发布并通过原生阅读。Mac 候选有本地启停/登录/重连逻辑。

尚未由本规范验证：新的抽屉相关性质量与 token 收益；每种复杂多 Agent 结论的语义交接准确性；当前独立候选的所有 Skill 发布、读取消费；Profile 污染实际比例；完整双面 Skill/MCP UI；全部组件的具体冲突是否复现；真实 MCP 各段延迟；整个宿主持续运行 24h 的恢复能力。后续不得把这份设计文档标记成这些功能已上线。

参考源码和历史核查入口：
- Mimi PR #12: https://github.com/mor765504-gif/Mimi-Superagent/pull/12
- 先前研究记录：`docs/research/2026-11-07-drawers-architecture-review.md`
- Orchestration: `backend/deploy/hermes/plugins/mimi_orchestration/runtime.py`、`gateway.py`、`input_adapter.py`
- Memory: `backend/deploy/hermes/plugins/mimi_memory/provider.py`、`backend/core/assisthub_core/context.py`
- Persona: `backend/deploy/hermes/plugins/mimi_tavern/`
- Skill P6: `backend/core/assisthub_core/skills_release/README.md`
- UI: `docs/guide/FRONTEND-INVENTORY.md`、`docs/plans/2026-11-04-mcp-lifecycle/VALIDATION.md`
- Product: `backend/deploy/mimi_cli/mimi_product_runtime.py`
- 旧学习/技能实际消费记录：`backend/docs/evidence/2026-09-30-closeout-live-status.md`
