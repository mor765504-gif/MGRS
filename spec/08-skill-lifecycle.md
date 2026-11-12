[协议索引](../MGRS.md) · **MGRS 0.1 设计候选** · [上一章](07-tools-and-effects.md#mgrs-7) · [下一章](09-persona.md#mgrs-9)

<a id="mgrs-8"></a>

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
