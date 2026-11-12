[协议索引](../MGRS.md) · **MGRS 0.1 设计候选** · [上一章](09-persona.md#mgrs-9) · [下一章](11-host-and-recovery.md#mgrs-11)

<a id="mgrs-10"></a>

## 10. Profile / Cache / 文件隔离

Profile 合同分别声明 session 数据库、memory grant、Persona 来源、技能目录、MCP capability、材料对象域与子 Agent 派生边界。对确有业务价值的共享偏好采用显式 grant，不将独立数据库误写成全部内容隔离。

例如，原研究候选中的 default 与 ai-daily 各有独立的原生会话数据库，同时配置了对同一份记忆的读写权限。判断两者是否应该共享，要核对该项授权和实际读写范围。[原研究记录](../docs/RESEARCH.md)

必须检验：两个 Profile 独有记忆哨兵、一个允许共享项、撤回后同轮/下轮刷新、过期时间跨越、压缩/冷启动、项目同名 Skill、跨 profile 执行拒绝、晚到 Worker/通知不可串会话。未经实际测试不报告污染率。
