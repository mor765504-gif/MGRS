[协议索引](../MGRS.md) · **MGRS 0.1 设计候选** · [上一章](13-reliability-and-promotion.md#mgrs-13) · [下一章](15-conflict-and-change-control.md#mgrs-15)

<a id="mgrs-14"></a>

## 14. 实施映射与分期

P0：读取现有运行实际装配、owner/profile grants、Persona 来源、Skill views、MCP allowlist、已生效压缩配置、原生回执与当前唯一验收。将当前缺失区分“模块不存在/未配置/未接通/未实测”。此阶段只有可观察性改造，不新建工作账本。

P1：只读抽屉选择器。改现有 mimi_memory 的 projection，不改变 Core 的事实 schema、撤回/时效判断及现有 2000 字符上限；与 mimi_tavern/任务引用协调序列化归属；优先保护关键约束，不加常驻辅助模型。验收需要真实中文样本与撤回/权限负面用例。

P2：结果消费合同与管理 UI。复用已有 native result/input evidence，增加目标接收者读取/使用证据，不重新开发 Reviewer 调度。现有 P6 Skill 发布与原生 loader 确认端到端贯通，加入技能/工具分别管理的状态视图。

P3：Persona 语境和性能实测。保留旧配置，针对人味、相关性、延迟和缓存成本做受控增量比较；只有观察到明确收益才纳入语义索引或更复杂表达候选。

P4：单宿主长运行真实验收。基于可观测 run 做 24h 及故障注入；未达标准则按具体故障缩小范围，不宣布整体通过。

每项改动使用已有仓库写集/owner、现行 PR/验收纪律；独立审阅在真实改变产品边界时进行，按受影响闭包回验。没有必要为了 MGRS 新增大量“协调 Agent”或把微小修改都变成复杂流程。
