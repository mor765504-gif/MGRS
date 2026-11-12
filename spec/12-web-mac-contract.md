[协议索引](../MGRS.md) · **MGRS 0.1 设计候选** · [上一章](11-host-and-recovery.md#mgrs-11) · [下一章](13-reliability-and-promotion.md#mgrs-13)

<a id="mgrs-12"></a>

## 12. Web/Mac 管理界面与后端契约

使用现有 /api/features、原生 session SSE、信任宿主身份、命令回执和权威回读。所有管理页有清晰边界：

- Memory/抽屉页：只读查看本轮选择、真实来源、预算、未选原因；事实写入仍用 Core recall/remember/forget，不让 UI 直接改 derived JSON。
- MCP 页：连接、当前权限、工具发现、服务健康、性能与最近调用；配置不等于授权。
- Skill 页：来源、版本、能力依赖、测试、stage、批准、active/revoked；不借 Skill UI 修改 MCP 权限。
- Workshop 页：task/attempt/dependency/results/verification/claim/recovery；不能用 view 关闭取消已接工作。
- Persona 页：私有人格来源与切面、实际加载版本、受控迁移与回滚；不触碰记忆写入授权。

共同的 UI 状态至少区分 unavailable、unconfigured、unauthorized、pending、running、unknown-effect、verified、delivered 和 stale；映射既有业务状态而非在前端编造另一套业务状态机。状态都需显示最后来源/版本/观测时间。

新增页面必须覆盖身份切换、迟到网络响应、失败保留草稿、撤权即不可见、刷新恢复、独立暗色/窄屏、页面释放不干扰持续任务。不能由静态 screenshot 宣称真实用户旅程通过。
