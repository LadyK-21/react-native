import*as e from"../../core/i18n/i18n.js";import*as o from"../../ui/legacy/legacy.js";const t={title:"Components ⚛",command:"Show React DevTools Components panel"},n=e.i18n.registerUIStrings("panels/react_devtools/react_devtools_components-meta.ts",t),a=e.i18n.getLazilyComputedLocalizedString.bind(void 0,n);let i;o.ViewManager.registerViewExtension({location:"panel",id:"react-devtools-components",title:a(t.title),commandPrompt:a(t.command),persistence:"permanent",order:1e3,loadView:async()=>new((await async function(){return i||(i=await import("./react_devtools.js")),i}()).ReactDevToolsComponentsView.ReactDevToolsComponentsViewImpl)});
