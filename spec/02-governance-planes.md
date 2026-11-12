[协议索引](../MGRS.md) · **MGRS 0.1 设计候选** · [上一章](01-purpose-and-boundaries.md#mgrs-1) · [下一章](03-invariants.md#mgrs-3)

<a id="mgrs-2"></a>

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
