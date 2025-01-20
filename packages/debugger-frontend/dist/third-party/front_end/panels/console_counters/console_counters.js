import*as e from"../../core/common/common.js";import*as o from"../../core/host/host.js";import*as t from"../../core/i18n/i18n.js";import*as s from"../../core/sdk/sdk.js";import*as n from"../../models/issues_manager/issues_manager.js";import*as r from"../../ui/components/icon_button/icon_button.js";import*as i from"../../ui/components/issue_counter/issue_counter.js";import*as a from"../../ui/legacy/legacy.js";import*as l from"../../ui/visual_logging/visual_logging.js";const u={sErrors:"{n, plural, =1 {# error} other {# errors}}",sWarnings:"{n, plural, =1 {# warning} other {# warnings}}",openConsoleToViewS:"Open Console to view {PH1}",openIssuesToView:"{n, plural, =1 {Open Issues to view # issue:} other {Open Issues to view # issues:}}"},c=t.i18n.registerUIStrings("panels/console_counters/WarningErrorCounter.ts",u),d=t.i18n.getLocalizedString.bind(void 0,c);let h;class p{toolbarItem;consoleCounter;issueCounter;throttler;updatingForTest;constructor(){p.instanceForTest=this;const t=document.createElement("div");this.toolbarItem=new a.Toolbar.ToolbarItemWithCompactLayout(t),this.toolbarItem.setVisible(!1),this.toolbarItem.addEventListener("CompactLayoutUpdated",this.onSetCompactLayout,this),this.consoleCounter=new r.IconButton.IconButton,this.consoleCounter.setAttribute("jslog",`${l.counter("console").track({click:!0})}`),t.appendChild(this.consoleCounter),this.consoleCounter.data={clickHandler:e.Console.Console.instance().show.bind(e.Console.Console.instance()),groups:[{iconName:"cross-circle-filled",iconColor:"var(--icon-error)",iconHeight:"14px",iconWidth:"14px"},{iconName:"warning-filled",iconColor:"var(--icon-warning)",iconHeight:"14px",iconWidth:"14px"}]};const u=n.IssuesManager.IssuesManager.instance();this.issueCounter=new i.IssueCounter.IssueCounter,this.issueCounter.classList.add("main-toolbar"),this.issueCounter.setAttribute("jslog",`${l.counter("issue").track({click:!0})}`),t.appendChild(this.issueCounter),this.issueCounter.data={clickHandler:()=>{o.userMetrics.issuesPanelOpenedFrom(2),a.ViewManager.ViewManager.instance().showView("issues-pane")},issuesManager:u,displayMode:"OnlyMostImportant"},this.throttler=new e.Throttler.Throttler(100),s.TargetManager.TargetManager.instance().addModelListener(s.ConsoleModel.ConsoleModel,s.ConsoleModel.Events.ConsoleCleared,this.update,this),s.TargetManager.TargetManager.instance().addModelListener(s.ConsoleModel.ConsoleModel,s.ConsoleModel.Events.MessageAdded,this.update,this),s.TargetManager.TargetManager.instance().addModelListener(s.ConsoleModel.ConsoleModel,s.ConsoleModel.Events.MessageUpdated,this.update,this),u.addEventListener("IssuesCountUpdated",this.update,this),this.update()}onSetCompactLayout(e){this.setCompactLayout(e.data)}setCompactLayout(e){this.consoleCounter.data={...this.consoleCounter.data,compact:e},this.issueCounter.data={...this.issueCounter.data,compact:e}}static instance(e={forceNew:null}){const{forceNew:o}=e;return h&&!o||(h=new p),h}updatedForTest(){}update(){this.updatingForTest=!0,this.throttler.schedule(this.updateThrottled.bind(this))}get titlesForTesting(){const e=this.consoleCounter.shadowRoot?.querySelector("button");return e?e.getAttribute("aria-label"):null}async updateThrottled(){const e=s.ConsoleModel.ConsoleModel.allErrors(),o=s.ConsoleModel.ConsoleModel.allWarnings(),t=n.IssuesManager.IssuesManager.instance(),r=t.numberOfIssues(),l=e=>0===e?void 0:`${e}`,c=d(u.sErrors,{n:e}),h=d(u.sWarnings,{n:o}),p=[l(e),l(o)];let C="";e&&o?C=`${c}, ${h}`:e?C=c:o&&(C=h);const g=d(u.openConsoleToViewS,{PH1:C}),m=this.consoleCounter.data;this.consoleCounter.data={...m,groups:m.groups.map(((e,o)=>({...e,text:p[o]}))),accessibleName:g},a.Tooltip.Tooltip.install(this.consoleCounter,g),this.consoleCounter.classList.toggle("hidden",!(e||o));const M=i.IssueCounter.getIssueCountsEnumeration(t),I=`${d(u.openIssuesToView,{n:r})} ${M}`;a.Tooltip.Tooltip.install(this.issueCounter,I),this.issueCounter.data={...this.issueCounter.data,accessibleName:I},this.issueCounter.classList.toggle("hidden",!r),this.toolbarItem.setVisible(Boolean(e||o||r)),a.InspectorView.InspectorView.instance().toolbarItemResized(),this.updatingForTest=!1,this.updatedForTest()}item(){return this.toolbarItem}static instanceForTest=null}var C=Object.freeze({__proto__:null,WarningErrorCounter:p});export{C as WarningErrorCounter};
