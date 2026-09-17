/*
 * CORVIDAE Plugin – gebaut mit esbuild
 * Quellcode: ORGANISATION/CORVIDAE PLUGIN/CURSOR/corvidae-v-2.0.0
 * Author: ein.ink
 */

"use strict";var Ht=Object.defineProperty;var ho=Object.getOwnPropertyDescriptor;var uo=Object.getOwnPropertyNames;var fo=Object.prototype.hasOwnProperty;var go=(o,t)=>{for(var e in t)Ht(o,e,{get:t[e],enumerable:!0})},mo=(o,t,e,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of uo(t))!fo.call(o,s)&&s!==e&&Ht(o,s,{get:()=>t[s],enumerable:!(r=ho(t,s))||r.enumerable});return o};var bo=o=>mo(Ht({},"__esModule",{value:!0}),o);var Yi={};go(Yi,{default:()=>Gt});module.exports=bo(Yi);var X=require("obsidian");var me=require("obsidian");var Vr={"settings.title":"CORVIDAE","settings.subtitle":"Graph-View & Frontmatter von ein.ink","settings.tips.name":"Beschreibung & Tipps","settings.tips.desc":"Erstellt oder aktualisiert CORVIDAE.md im Vault und \xF6ffnet die Datei.","settings.tips.button":"Tipps \xF6ffnen","settings.tips.viewTitle":"CORVIDAE","settings.tips.notice.opened":"CORVIDAE.md Tipps ge\xF6ffnet.","settings.tips.notice.error":"CORVIDAE.md konnte nicht erstellt oder ge\xF6ffnet werden.","settings.language.name":"Sprache","settings.language.desc":"Anzeigesprache f\xFCr die Plugin-Oberfl\xE4che.","settings.language.auto":"Automatisch (Obsidian UI)","settings.language.en":"English","settings.language.de":"Deutsch","settings.showLegend.name":"Legende anzeigen","settings.showLegend.desc":"Zeigt oben links im Graph einen Farbfilter und Notiznamen mit Farb-Dot. Klick \xF6ffnet die Notiz in einem neuen Tab.","settings.legendShowAll.name":"Alle Knoten in Legende","settings.legendShowAll.desc":"Auch Knoten ohne color und mit Standardfarbe anzeigen. Standard: nur abweichende Farben.","settings.graphHideBaseEmbedLinks.name":".base/.canvas-Embeds im Graph entkoppeln","settings.graphHideBaseEmbedLinks.desc":"Entfernt Linie und Force f\xFCr ![[datei.base]] / ![[datei.canvas]]-Embeds. Ein normaler [[\u2026]]-Link bleibt verbunden.","settings.graphOnlyFrontmatterLinks.name":"Graph nur \xFCber Frontmatter-Link","settings.graphOnlyFrontmatterLinks.desc":"Nur das Frontmatter-Feld link erzeugt Graph-Kanten. [[\u2026]] in der Notiz bleiben klickbar, beeinflussen den Graph aber nicht.","settings.sizeProperty.name":"Frontmatter-Feld: Gr\xF6\xDFe","settings.sizeProperty.desc":"Graph-Property (Typ: Graph). Beispiel: size: 50","settings.minSize.name":"Minimale Gr\xF6\xDFe","settings.maxSize.name":"Maximale Gr\xF6\xDFe","settings.colorProperty.name":"Frontmatter-Feld: Farbe","settings.colorProperty.desc":'Graph-Property (Typ: Graph). Beispiel: color: "#888888"',"settings.folderNotes.heading":"Folder-Notes","settings.folderNotes.enabled.name":"Folder-Notes aktiv","settings.folderNotes.enabled.desc":"Explorer-Verhalten und explizite Erstellung \xFCber Button / Kontextmen\xFC. Normale Notizen und Ordner bleiben unver\xE4ndert.","settings.folderNotes.syncRename.name":"Ordner folgt Umbenennung","settings.folderNotes.excludedPaths.name":"Ausgeschlossene Pfade","settings.folderNotes.excludedPaths.desc":"Komma-getrennt. Kein Auto-Sync in diesen Pfaden.","settings.folderNotes.openOnClick.name":"Ordner \xF6ffnet Notiz","settings.folderNotes.hideInExplorer.name":"Notiz im Explorer verstecken","settings.developmentFolders.heading":"Entwicklungsordner","settings.developmentFolders.desc":"Container f\xFCr Projekte (z.\u202FB. CURSOR). Der Ordner und seine direkten Kinder bleiben sichtbar; die Kinder bekommen das Label DEV. Inhalt unter den direkten Kindern ist versiegelt (nicht aufklappbar, nicht im Vault-Graph, kein Auto-Frontmatter).","settings.developmentFolders.add":"Ordner hinzuf\xFCgen","settings.developmentFolders.remove":"Entfernen","settings.developmentFolders.pathPlaceholder":"z.\u202FB. CURSOR","settings.customGraph.heading":"Custom Graph","settings.customGraph.desc":"Ordnerstruktur-Graph pro Projekt. Entwicklungsordner (z.\u202FB. CURSOR) versiegelt die Projekte; Projektordner tr\xE4gt dev.md und \xF6ffnet den Graph per Klick; Code-Ordner (z.\u202FB. src) liefert die Knoten. Funktionen blendet Symbole aus dem Code ein.","settings.customGraph.add":"Custom Graph hinzuf\xFCgen","settings.customGraph.remove":"Entfernen","settings.customGraph.defaultName":"Custom Graph","settings.customGraph.name":"Name","settings.customGraph.namePlaceholder":"z.\u202FB. Test Graph","settings.customGraph.folder.name":"Projektordner","settings.customGraph.folder.desc":"Projektroot (z.\u202FB. CURSOR/corvidae-v-2.0.0). Hier liegt dev.md. Klick auf diesen Ordner (DEV) im Explorer \xF6ffnet den Graph.","settings.customGraph.folder.placeholder":"z.\u202FB. CURSOR/corvidae-v-2.0.0","settings.customGraph.codeFolder.name":"Code-Ordner","settings.customGraph.codeFolder.desc":"Scan-Wurzel f\xFCr Graph-Knoten (z.\u202FB. src). Relativ zum Projektordner oder vault-relativ. Leer = gesamter Projektordner.","settings.customGraph.codeFolder.placeholder":"z.\u202FB. src","customGraph.viewTitle":"Custom Graph","customGraph.command":"Custom Graph \xF6ffnen","customGraph.ribbonTooltip":"Custom Graph","customGraph.empty":"W\xE4hle unter Einstellungen \u2192 CORVIDAE \u2192 Custom Graph einen Projektordner.","customGraph.notice.noFolder":"Lege zuerst einen Custom Graph mit Projektordner in den CORVIDAE-Einstellungen an.","customGraph.pickPlaceholder":"Custom Graph w\xE4hlen\u2026","customGraph.bonus.off":"Funktionen","customGraph.bonus.on":"Funktionen (an)","customGraph.edgeLength":"Kantenl\xE4nge","settings.newNotes.heading":"Neue Notizen","settings.newNotes.autoFrontmatter.name":"Auto-Frontmatter","settings.newNotes.autoFrontmatter.desc":"Neue .md-Dateien erhalten automatisch aliases, tags, size und color (nur wenn leer).","settings.newNotes.defaultTags.name":"Standard-tags","settings.newNotes.defaultTags.desc":"Komma-getrennt, z.B. CORVIDAE, draft","settings.newNotes.defaultSize.name":"Standard-size","settings.newNotes.defaultColor.name":"Standard-color","settings.newNotes.defaultColor.desc":"Hex-Farbcode f\xFCr neue Notizen, z.B. #888888","settings.advanced.heading":"Erweitert","settings.advanced.patchInterval.name":"Patch-Intervall (ms)","settings.advanced.patchInterval.desc":"Wie oft der Graph intern aktualisiert wird.","folderNote.menuTitle":"Neue Folder-Note","folderNote.defaultName":"Ohne Titel","explorer.tag.note":"NOTIZ","explorer.tag.draw":"ZEICH","explorer.tag.folder":"ORDNER","explorer.tag.hybrid":"HYBRID","explorer.tag.dev":"DEV","properties.graphType":"Graph","properties.linkType":"Link","legend.title":"CORVIDAE","legend.filterColor":"Nach Farbe filtern","legend.empty":"Keine Notizen f\xFCr diese Farbe","dashboard.viewTitle":"CORVIDAE Dashboard","dashboard.title":"CORVIDAE","dashboard.subtitle":"Deine Projekt\xFCbersicht","dashboard.projects.heading":"Projekte","dashboard.projects.empty":"Noch keine Projekte \u2014 lege eine Folder-Note an.","dashboard.actions.newProject":"Neues Projekt","dashboard.actions.openGraph":"Graph \xF6ffnen","dashboard.bar.expand":"Dashboard-Leiste ausklappen","dashboard.bar.collapse":"Dashboard-Leiste einklappen","dashboard.crow.link":"CORVIDAE \xF6ffnen","dashboard.box.create":"Box erstellen","dashboard.box.move":"Boxen bewegen","dashboard.box.edit":"Boxen bearbeiten","dashboard.box.openTab":"Tab \xF6ffnen","dashboard.box.empty":"Noch keine Boxen \u2014 klicke auf \u201EBox erstellen\u201C.","dashboard.box.emptyHint":"Noch keine Boxen \u2014 Rechtsklick auf die Dashboard-Fl\xE4che \xF6ffnet das Men\xFC, dort \u201EBox erstellen\u201C w\xE4hlen.","dashboard.box.comingSoon":"Demn\xE4chst verf\xFCgbar","dashboard.box.selectHint":"Zuerst eine Box \xFCber den Titel ausw\xE4hlen.","dashboard.box.editHint":"Ausgew\xE4hlte Box bearbeiten","dashboard.box.moveHint":"Boxen verschieben und skalieren","dashboard.box.moveActiveHint":"Ecke unten rechts ziehen oder Zielposition anklicken","dashboard.box.resizeHint":"Box skalieren","dashboard.box.modal.title":"Neue Box","dashboard.box.modal.editTitle":"Box bearbeiten","dashboard.box.modal.boxTitle":"Titel","dashboard.box.modal.type":"Typ","dashboard.box.type.empty":"Leer","dashboard.box.type.graph":"Graph","dashboard.box.type.note":"Notiz","dashboard.box.type.browser":"Browser","dashboard.box.type.terminal":"Terminal","dashboard.box.type.ticket":"Ticket","dashboard.box.modal.note":"Notiz","dashboard.box.modal.noteDesc":"Tippe zum Suchen nach Alias, Name oder Pfad.","dashboard.box.modal.notePlaceholder":"Notiz suchen\u2026","dashboard.box.modal.link":"Link","dashboard.box.modal.linkDesc":"Webseiten-URL f\xFCr den eingebetteten Web Viewer.","dashboard.box.modal.linkPlaceholder":"https://example.com","dashboard.box.modal.ticketProject":"Projekt","dashboard.box.modal.ticketProjectDesc":"Ticket-Projekt, dessen Entwicklungslog die Alerts liefert.","dashboard.box.modal.ticketProjectPlaceholder":"Projekt w\xE4hlen\u2026","dashboard.box.modal.ticketDisplayMode":"Anzeige","dashboard.box.modal.ticketDisplayMode.last":"Letztes Ticket","dashboard.box.modal.ticketDisplayMode.all":"Alle Tickets","dashboard.box.modal.size":"Gr\xF6\xDFe","dashboard.box.modal.save":"Speichern","dashboard.box.modal.cancel":"Abbrechen","dashboard.box.modal.delete":"L\xF6schen","dashboard.box.error.titleRequired":"Bitte einen Titel eingeben.","dashboard.box.error.noteRequired":"Bitte eine Notiz ausw\xE4hlen.","dashboard.box.error.linkRequired":"Bitte einen g\xFCltigen Link eingeben.","dashboard.box.error.noSpace":"Kein Platz mehr im Dashboard-Grid.","dashboard.box.error.terminalUnavailable":"Terminal-Plugin nicht verf\xFCgbar oder kein einbettbares Standard-Profil.","dashboard.box.error.webviewerUnavailable":"Web-Viewer Core-Plugin ist deaktiviert. In den Obsidian-Einstellungen aktivieren.","dashboard.box.error.ticketProjectRequired":"Bitte ein Ticket-Projekt ausw\xE4hlen.","dashboard.box.error.ticketLogMissing":"Entwicklungslog fehlt. In den CORVIDAE-Ticket-Projekt-Einstellungen setzen.","dashboard.box.ticketNoProject":"Kein Ticket-Projekt ausgew\xE4hlt.","dashboard.box.ticketLogMissing":"Entwicklungslog nicht konfiguriert oder fehlt.","dashboard.box.ticketLogEmpty":"Keine Ticket-Alerts im Entwicklungslog gefunden.","dashboard.box.terminalUnavailable":"Terminal nicht verf\xFCgbar. Terminal-Plugin aktivieren und integriertes Standard-Profil setzen.","dashboard.box.webviewerUnavailable":"Web Viewer nicht verf\xFCgbar. Core-Plugin \u201EWeb Viewer\u201C in den Obsidian-Einstellungen aktivieren.","settings.dashboard.heading":"Dashboard","settings.dashboard.autoOpen.name":"Split-down Dashboard","settings.dashboard.autoOpen.desc":"Gro\xDFes Dashboard ohne offene Ansicht. Bei ge\xF6ffnetem Inhalt erscheint unten eine horizontal scrollbare Projekt-Leiste mit Crow-Toggle.","settings.showNoteFileTitle.name":"Dateititel anzeigen","settings.showNoteFileTitle.desc":"Den Dateititel (.md Inline-Titel) in Notizen ein- oder ausblenden.","settings.tickets.heading":"Tickets","settings.tickets.desc":"Projekte mit Undone- und Done-Ordnern konfigurieren. In der Ticket-Sidebar kann pro Projekt ein neues Ticket erstellt werden.","settings.tickets.addProject":"Projekt hinzuf\xFCgen","settings.tickets.defaultProjectName":"Neues Projekt","settings.tickets.projectName":"Projektname","settings.tickets.projectNamePlaceholder":"z.B. LIFE ON AMNESIA","settings.tickets.undoneFolder":"Undone-Ordner","settings.tickets.undoneFolderDesc":"Ordner f\xFCr offene Tickets.","settings.tickets.doneFolder":"Done-Ordner","settings.tickets.doneFolderDesc":"Ordner f\xFCr erledigte Tickets (f\xFCr Nummerierung).","settings.tickets.developmentLogPath":"Entwicklungslog","settings.tickets.developmentLogPathDesc":"Markdown-Notiz mit Ticket-Alerts (z. B. ENTWICKLUNG.md Callouts).","settings.tickets.removeProject":"Projekt entfernen","settings.tickets.autoOpen.name":"Ticket-Sidebar automatisch \xF6ffnen","settings.tickets.autoOpen.desc":"\xD6ffnet die Ticket-Sidebar unten in der rechten Sidebar beim Start.","tickets.viewTitle":"CORVIDAE Tickets","tickets.command":"Ticket-Sidebar \xF6ffnen","tickets.create":"Erstellen","tickets.inputPlaceholder":"Ticket-Inhalt\u2026","tickets.empty":"Keine Projekte konfiguriert \u2014 in den CORVIDAE-Einstellungen anlegen.","tickets.unnamedProject":"Unbenanntes Projekt","tickets.notice.created":"{name} erstellt.","tickets.error.nameRequired":"Projektname fehlt.","tickets.error.undoneRequired":"Undone-Ordner fehlt.","tickets.error.doneRequired":"Done-Ordner fehlt.","tickets.error.undoneMissing":"Undone-Ordner existiert nicht.","tickets.error.doneMissing":"Done-Ordner existiert nicht.","tickets.error.bodyRequired":"Bitte Ticket-Inhalt eingeben.","tickets.error.alreadyExists":"{name} existiert bereits.","tickets.error.createFailed":"Ticket konnte nicht erstellt werden.","console.loaded":"CORVIDAE Plugin geladen","console.unloaded":"CORVIDAE Plugin entladen","console.propertyTypesFailed":"CORVIDAE: Property-Typen konnten nicht registriert werden"};var _r={"settings.title":"CORVIDAE","settings.subtitle":"Graph view & frontmatter by ein.ink","settings.tips.name":"Description & tips","settings.tips.desc":"Creates or updates CORVIDAE.md in your vault and opens it.","settings.tips.button":"Open tips","settings.tips.viewTitle":"CORVIDAE","settings.tips.notice.opened":"Opened CORVIDAE.md tips.","settings.tips.notice.error":"Could not create or open CORVIDAE.md.","settings.language.name":"Language","settings.language.desc":"Display language for plugin UI.","settings.language.auto":"Automatic (Obsidian UI)","settings.language.en":"English","settings.language.de":"Deutsch","settings.showLegend.name":"Show legend","settings.showLegend.desc":"Shows a color filter and note names with color dots in the top-left of the graph. Click opens the note in a new tab.","settings.legendShowAll.name":"All nodes in legend","settings.legendShowAll.desc":"Also show nodes without color and with the default color. Default: only non-default colors.","settings.graphHideBaseEmbedLinks.name":"Decouple .base/.canvas embeds in graph","settings.graphHideBaseEmbedLinks.desc":"Remove force and edge for ![[file.base]] / ![[file.canvas]] embeds. A normal [[\u2026]] link still connects.","settings.graphOnlyFrontmatterLinks.name":"Graph only via frontmatter link","settings.graphOnlyFrontmatterLinks.desc":"Only the frontmatter link field creates graph edges. [[\u2026]] in the note stay clickable but do not affect the graph.","settings.sizeProperty.name":"Frontmatter field: size","settings.sizeProperty.desc":"Graph property (type: Graph). Example: size: 50","settings.minSize.name":"Minimum size","settings.maxSize.name":"Maximum size","settings.colorProperty.name":"Frontmatter field: color","settings.colorProperty.desc":'Graph property (type: Graph). Example: color: "#888888"',"settings.folderNotes.heading":"Folder notes","settings.folderNotes.enabled.name":"Folder notes enabled","settings.folderNotes.enabled.desc":"Explorer behavior and explicit creation via button / context menu. Regular notes and folders remain unchanged.","settings.folderNotes.syncRename.name":"Folder follows rename","settings.folderNotes.excludedPaths.name":"Excluded paths","settings.folderNotes.excludedPaths.desc":"Comma-separated. No auto-sync in these paths.","settings.folderNotes.openOnClick.name":"Folder opens note","settings.folderNotes.hideInExplorer.name":"Hide note in explorer","settings.developmentFolders.heading":"Development folders","settings.developmentFolders.desc":"Container for projects (e.g. CURSOR). The folder and its direct children stay visible; children get the DEV label. Content under those children is sealed (not expandable, omitted from the vault graph, no auto frontmatter).","settings.developmentFolders.add":"Add folder","settings.developmentFolders.remove":"Remove","settings.developmentFolders.pathPlaceholder":"e.g. CURSOR","settings.customGraph.heading":"Custom Graph","settings.customGraph.desc":"Folder-structure graph per project. Development folder (e.g. CURSOR) seals projects; project folder holds dev.md and opens the graph on click; code folder (e.g. src) supplies the nodes. Enable Functions for symbols from code.","settings.customGraph.add":"Add Custom Graph","settings.customGraph.remove":"Remove","settings.customGraph.defaultName":"Custom Graph","settings.customGraph.name":"Name","settings.customGraph.namePlaceholder":"e.g. Test Graph","settings.customGraph.folder.name":"Project folder","settings.customGraph.folder.desc":"Project root (e.g. CURSOR/corvidae-v-2.0.0). dev.md lives here. Clicking this folder (DEV) in the explorer opens the graph.","settings.customGraph.folder.placeholder":"e.g. CURSOR/corvidae-v-2.0.0","settings.customGraph.codeFolder.name":"Code folder","settings.customGraph.codeFolder.desc":"Scan root for graph nodes (e.g. src). Relative to the project folder or vault-relative. Empty = entire project folder.","settings.customGraph.codeFolder.placeholder":"e.g. src","customGraph.viewTitle":"Custom Graph","customGraph.command":"Open Custom Graph","customGraph.ribbonTooltip":"Custom Graph","customGraph.empty":"Select a project folder under Settings \u2192 CORVIDAE \u2192 Custom Graph.","customGraph.notice.noFolder":"Add a Custom Graph with a project folder in CORVIDAE settings first.","customGraph.bonus.off":"Functions","customGraph.bonus.on":"Functions (on)","customGraph.edgeLength":"Edge length","customGraph.pickPlaceholder":"Choose Custom Graph\u2026","settings.newNotes.heading":"New notes","settings.newNotes.autoFrontmatter.name":"Auto frontmatter","settings.newNotes.autoFrontmatter.desc":"New .md files automatically receive aliases, tags, size, and color (only when empty).","settings.newNotes.defaultTags.name":"Default tags","settings.newNotes.defaultTags.desc":"Comma-separated, e.g. CORVIDAE, draft","settings.newNotes.defaultSize.name":"Default size","settings.newNotes.defaultColor.name":"Default color","settings.newNotes.defaultColor.desc":"Hex color code for new notes, e.g. #888888","settings.advanced.heading":"Advanced","settings.advanced.patchInterval.name":"Patch interval (ms)","settings.advanced.patchInterval.desc":"How often the graph is updated internally.","folderNote.menuTitle":"New folder note","folderNote.defaultName":"Untitled","explorer.tag.note":"NOTE","explorer.tag.draw":"DRAW","explorer.tag.folder":"FOLDER","explorer.tag.hybrid":"HYBRID","explorer.tag.dev":"DEV","properties.graphType":"Graph","properties.linkType":"Link","legend.title":"CORVIDAE","legend.filterColor":"Filter by color","legend.empty":"No notes for this color","dashboard.viewTitle":"CORVIDAE Dashboard","dashboard.title":"CORVIDAE","dashboard.subtitle":"Your project overview","dashboard.projects.heading":"Projects","dashboard.projects.empty":"No projects yet \u2014 create a folder note.","dashboard.actions.newProject":"New project","dashboard.actions.openGraph":"Open graph","dashboard.bar.expand":"Expand dashboard bar","dashboard.bar.collapse":"Collapse dashboard bar","dashboard.crow.link":"Open CORVIDAE","dashboard.box.create":"Create box","dashboard.box.move":"Move boxes","dashboard.box.edit":"Edit boxes","dashboard.box.openTab":"Open tab","dashboard.box.empty":"No boxes yet \u2014 click \u201CCreate box\u201D.","dashboard.box.emptyHint":"No boxes yet \u2014 right-click the dashboard surface to open the menu, then choose \u201CCreate box\u201D.","dashboard.box.comingSoon":"Coming soon","dashboard.box.selectHint":"Select a box first by clicking its title.","dashboard.box.editHint":"Edit selected box","dashboard.box.moveHint":"Move and resize boxes","dashboard.box.moveActiveHint":"Drag the bottom-right corner or click a target position","dashboard.box.resizeHint":"Resize box","dashboard.box.modal.title":"New box","dashboard.box.modal.editTitle":"Edit box","dashboard.box.modal.boxTitle":"Title","dashboard.box.modal.type":"Type","dashboard.box.type.empty":"Empty","dashboard.box.type.graph":"Graph","dashboard.box.type.note":"Note","dashboard.box.type.browser":"Browser","dashboard.box.type.terminal":"Terminal","dashboard.box.type.ticket":"Ticket","dashboard.box.modal.note":"Note","dashboard.box.modal.noteDesc":"Type to search by alias, name, or path.","dashboard.box.modal.notePlaceholder":"Search note\u2026","dashboard.box.modal.link":"Link","dashboard.box.modal.linkDesc":"Website URL for the embedded Web Viewer.","dashboard.box.modal.linkPlaceholder":"https://example.com","dashboard.box.modal.ticketProject":"Project","dashboard.box.modal.ticketProjectDesc":"Ticket project whose development log supplies the alerts.","dashboard.box.modal.ticketProjectPlaceholder":"Select project\u2026","dashboard.box.modal.ticketDisplayMode":"Display","dashboard.box.modal.ticketDisplayMode.last":"Last ticket","dashboard.box.modal.ticketDisplayMode.all":"All tickets","dashboard.box.modal.size":"Size","dashboard.box.modal.save":"Save","dashboard.box.modal.cancel":"Cancel","dashboard.box.modal.delete":"Delete","dashboard.box.error.titleRequired":"Please enter a title.","dashboard.box.error.noteRequired":"Please select a note.","dashboard.box.error.linkRequired":"Please enter a valid link.","dashboard.box.error.noSpace":"No space left on the dashboard grid.","dashboard.box.error.terminalUnavailable":"Terminal plugin is not available or has no embeddable default profile.","dashboard.box.error.webviewerUnavailable":"Web Viewer core plugin is disabled. Enable it in Obsidian settings.","dashboard.box.error.ticketProjectRequired":"Please select a ticket project.","dashboard.box.error.ticketLogMissing":"Development log is missing. Set it in CORVIDAE ticket project settings.","dashboard.box.ticketNoProject":"No ticket project selected.","dashboard.box.ticketLogMissing":"Development log not configured or missing.","dashboard.box.ticketLogEmpty":"No ticket alerts found in the development log.","dashboard.box.terminalUnavailable":"Terminal unavailable. Enable the Terminal plugin and set an integrated default profile.","dashboard.box.webviewerUnavailable":"Web Viewer unavailable. Enable the Web Viewer core plugin in Obsidian settings.","settings.dashboard.heading":"Dashboard","settings.dashboard.autoOpen.name":"Split-down dashboard","settings.dashboard.autoOpen.desc":"Large dashboard when nothing is open. When content is open, a horizontally scrollable project bar appears at the bottom with a crow toggle.","settings.showNoteFileTitle.name":"Show file title","settings.showNoteFileTitle.desc":"Show or hide the file title (.md inline title) in notes.","settings.tickets.heading":"Tickets","settings.tickets.desc":"Configure projects with undone and done folders. The ticket sidebar lets you create a new ticket per project.","settings.tickets.addProject":"Add project","settings.tickets.defaultProjectName":"New project","settings.tickets.projectName":"Project name","settings.tickets.projectNamePlaceholder":"e.g. LIFE ON AMNESIA","settings.tickets.undoneFolder":"Undone folder","settings.tickets.undoneFolderDesc":"Folder for open tickets.","settings.tickets.doneFolder":"Done folder","settings.tickets.doneFolderDesc":"Folder for completed tickets (used for numbering).","settings.tickets.developmentLogPath":"Development log","settings.tickets.developmentLogPathDesc":"Markdown note with ticket alerts (e.g. ENTWICKLUNG.md callouts).","settings.tickets.removeProject":"Remove project","settings.tickets.autoOpen.name":"Auto-open ticket sidebar","settings.tickets.autoOpen.desc":"Opens the ticket sidebar at the bottom of the right sidebar on startup.","tickets.viewTitle":"CORVIDAE Tickets","tickets.command":"Open ticket sidebar","tickets.create":"Create","tickets.inputPlaceholder":"Ticket content\u2026","tickets.empty":"No projects configured \u2014 add them in CORVIDAE settings.","tickets.unnamedProject":"Unnamed project","tickets.notice.created":"Created {name}.","tickets.error.nameRequired":"Project name is required.","tickets.error.undoneRequired":"Undone folder is required.","tickets.error.doneRequired":"Done folder is required.","tickets.error.undoneMissing":"Undone folder does not exist.","tickets.error.doneMissing":"Done folder does not exist.","tickets.error.bodyRequired":"Please enter ticket content.","tickets.error.alreadyExists":"{name} already exists.","tickets.error.createFailed":"Could not create ticket.","console.loaded":"CORVIDAE plugin loaded","console.unloaded":"CORVIDAE plugin unloaded","console.propertyTypesFailed":"CORVIDAE: could not register property types"};var zr={en:_r,de:Vr},Wr=()=>"auto";function jr(o){Wr=o}function vo(){return document.querySelector('.nav-action-button[aria-label="Neuer Ordner"]')?"de":"en"}function xo(o){return o==="auto"?vo():o}function d(o,t){let e=xo(t??Wr());return zr[e][o]??zr.en[o]}function Ur(o,t){switch(o){case"NOTE":return d("explorer.tag.note",t);case"DRAW":return d("explorer.tag.draw",t);case"FOLDER":return d("explorer.tag.folder",t);case"HYBRID":return d("explorer.tag.hybrid",t);case"DEV":return d("explorer.tag.dev",t)}}var _t=require("obsidian");var he="CORVIDAE.md",$r=`---
aliases:
  - "1"
tags:
  - corvidae
link:
  - "[[VERTRIEB]]"
  - "[[COMMUNITY]]"
  - "[[ENTWICKLUNG]]"
  - "[[ORGANISATION/CORVIDAE PLUGIN/DOKUMENTATION/DOKUMENTATION]]"
size: 100
color: "#ff1337"
---

\`\`\`corvidaehtml
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CORVIDAE \u2014 Obsidian Plugin v2.0.9</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@500;700;800&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap');

:root{
  --bg:        #0c0a0b;
  --bg-2:      #141012;
  --panel:     #1a1517;
  --line:      #2e2428;
  --accent:    #ff1337;
  --accent-dim:#6b0a18;
  --ink:       #f2e8ea;
  --muted:     #9a858c;
  --ok:        #3dd68c;
  --obs-bg:    #1e1e1e;
  --obs-bg-2:  #141414;
  --obs-panel: #252525;
  --obs-line:  #333333;
  --obs-muted: #888888;
  --obs-ink:   #dadada;
  --obs-blue:  #4a90e2;
  --obs-yellow:#e6c35c;
  --font-display: 'Syne', sans-serif;
  --font-body: 'IBM Plex Sans', sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;
  --mock-max: 960px;
  --mock-view-h: 560px;
}

*{ box-sizing:border-box; margin:0; padding:0; }

body{
  background:var(--bg);
  color:var(--ink);
  font-family:var(--font-body);
  font-size:15px;
  line-height:1.65;
  overflow-x:hidden;
}

body::before{
  content:"";
  position:fixed; inset:0;
  background:
    radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,19,55,0.16), transparent 55%),
    radial-gradient(ellipse 50% 35% at 90% 30%, rgba(255,19,55,0.06), transparent 50%);
  pointer-events:none;
  z-index:0;
}

.wrap{ position:relative; z-index:1; max-width:1080px; margin:0 auto; padding:0 28px; }

nav{
  position:relative; z-index:20;
  border-bottom:1px solid var(--line);
  background:rgba(12,10,11,0.92);
  backdrop-filter:blur(8px);
}
.nav-inner{
  max-width:1080px; margin:0 auto; padding:14px 28px;
  display:flex; justify-content:space-between; align-items:center;
  flex-wrap:wrap; gap:12px;
}
.nav-brand{
  font-family:var(--font-display); font-weight:800; font-size:15px;
  letter-spacing:0.12em; color:var(--accent);
}
.nav-links{ display:flex; gap:18px; flex-wrap:wrap; }
.nav-links a{
  color:var(--muted); text-decoration:none; font-family:var(--font-mono);
  font-size:11px; letter-spacing:0.06em; text-transform:uppercase;
  transition:color 0.15s;
}
.nav-links a:hover{ color:var(--accent); }

/* ---------- HERO (Amnesia-style centered) ---------- */
.hero{
  min-height:520px;
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  text-align:center;
  padding:80px 28px 64px;
  position:relative; z-index:1;
}
.hero-emoji{
  font-size:clamp(48px, 8vw, 72px);
  line-height:1;
  margin-bottom:14px;
  opacity:0.55;
  pointer-events:none;
  user-select:none;
  filter:
    grayscale(1) brightness(0)
    drop-shadow(0 0 18px rgba(255,19,55,0.5))
    drop-shadow(0 0 36px rgba(255,19,55,0.25));
}

.eyebrow{
  font-family:var(--font-mono); font-size:11px; letter-spacing:0.28em;
  text-transform:uppercase; color:var(--muted); margin-bottom:18px;
}
.eyebrow span{ color:var(--accent); }

h1.title{
  font-family:var(--font-display); font-weight:800;
  font-size:clamp(42px, 8vw, 84px);
  letter-spacing:-0.02em; line-height:0.95;
  color:var(--ink); margin-bottom:22px;
}
h1.title em{
  font-style:normal; color:var(--accent);
}

.tagline{
  font-size:18px; color:var(--muted); max-width:540px; margin:0 auto;
  font-weight:400;
}

section{ padding:72px 0 88px; border-top:1px solid var(--line); }
.section-head{ margin-bottom:32px; text-align:center; }
.section-num{
  font-family:var(--font-mono); font-size:11px; color:var(--accent);
  letter-spacing:0.18em; display:block; margin-bottom:10px;
}
h2{
  font-family:var(--font-display); font-weight:700;
  font-size:clamp(24px, 3.5vw, 34px); letter-spacing:-0.01em;
  margin-bottom:12px;
}
.section-sub{ color:var(--muted); max-width:620px; font-size:15px; margin:0 auto; }

/* ---------- DASHBOARD MOCK (default Obsidian chrome) ---------- */
.mock{
  margin:8px auto 0;
  max-width:var(--mock-max);
  background:var(--obs-bg);
  border:1px solid var(--obs-line);
  border-radius:4px;
  overflow:hidden;
  box-shadow:0 12px 40px rgba(0,0,0,0.45);
  height:var(--mock-view-h);
  display:grid;
  grid-template-columns:168px 1fr 148px;
  font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position:relative;
}

.mock-tree,
.mock-side{
  position:relative;
  cursor:default;
  outline:none;
  transition:box-shadow 0.18s, outline-color 0.18s;
  box-shadow:inset 0 0 0 0 transparent;
}
.mock-tree:hover,
.mock-tree:focus-within,
.mock-tree.is-active,
.mock-side:hover,
.mock-side:focus-within,
.mock-side.is-active{
  box-shadow:inset 0 0 0 2px var(--accent);
  z-index:2;
}

.mock-tree{
  background:#1a1a1a;
  border-right:1px solid var(--obs-line);
  display:flex; flex-direction:column;
  overflow:hidden;
  position:relative;
}
.tree-tools{
  display:flex; gap:12px; align-items:center;
  padding:8px 10px; border-bottom:1px solid var(--obs-line);
  color:var(--obs-muted); flex-shrink:0;
}
.tree-tools svg{
  width:14px; height:14px; opacity:0.75; display:block;
}
.tree-list{
  padding:6px 0 8px; font-size:11px; color:var(--obs-ink);
  line-height:1.55; overflow:hidden; flex:1;
  user-select:none;
  cursor:default;
}
.tree-row{
  display:flex; align-items:center; justify-content:space-between;
  gap:6px; padding:2px 8px 2px 10px; color:#b0b0b0;
}
.tree-row .name{
  display:flex; align-items:center; gap:6px; min-width:0;
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
.tree-dot{
  width:7px; height:7px; border-radius:50%;
  flex-shrink:0;
  background:transparent;
  border:1.5px solid #8a8a8a;
  box-sizing:border-box;
}
.tree-row .tag{
  flex-shrink:0; font-size:8px; letter-spacing:0.06em;
  color:#777; text-transform:uppercase;
  padding:0;
  border:none;
}
.tree-children{
  position:relative;
  margin:0 0 2px;
  padding-left:18px;
}
.tree-children::before{
  content:"";
  position:absolute; left:14px; top:0; bottom:2px;
  width:1px; background:#333;
}
.tree-row.child{
  padding-left:12px;
  position:relative;
}
.tree-row.child::before{
  content:"";
  position:absolute; left:0; top:50%;
  width:8px; height:1px; background:#333;
}
.tree-children .tree-children{
  padding-left:16px;
}
.tree-children .tree-children::before{
  left:12px;
}
.tree-foot{
  margin-top:auto; padding:8px 10px; border-top:1px solid var(--obs-line);
  display:flex; align-items:center; justify-content:space-between;
  font-size:11px; color:var(--obs-ink); flex-shrink:0;
}
.tree-foot .icons{
  display:flex; align-items:center; gap:7px;
  color:var(--obs-muted);
}
.tree-foot .icons svg{ display:block; opacity:0.9; }

/* Description tooltips \u2014 float over the whole mock */
.mock-tooltip{
  display:none;
  position:absolute;
  left:50%; top:50%;
  transform:translate(-50%, -50%);
  z-index:40;
  width:min(420px, 86%);
  padding:28px 32px;
  background:rgba(18, 16, 17, 0.96);
  border:1px solid var(--line);
  border-radius:10px;
  box-shadow:
    0 0 0 1px rgba(255,19,55,0.12),
    0 18px 48px rgba(0,0,0,0.65);
  text-align:center;
  pointer-events:none;
  user-select:none;
  line-height:1.55;
}
.mock-tooltip.is-open{ display:block; }
.mock-tooltip .tt-title{
  font-family:var(--font-mono); font-size:12px; letter-spacing:0.14em;
  text-transform:uppercase; color:var(--accent); font-weight:600;
  margin-bottom:16px;
}
.mock-tooltip .tt-block{
  margin:0 0 16px; color:var(--ink);
  font-family:var(--font-body); font-size:15px;
}
.mock-tooltip .tt-block:last-child{ margin-bottom:0; }
.mock-tooltip .tt-label{
  display:block; font-family:var(--font-mono); font-size:11px;
  letter-spacing:0.1em; text-transform:uppercase; color:var(--muted);
  margin-bottom:6px;
}
.mock-tooltip .tt-tags{
  font-family:var(--font-mono); font-size:12px; letter-spacing:0.04em;
  color:var(--muted); line-height:1.85;
}
.mock-tooltip .tt-tags span{ color:var(--ink); font-weight:500; }
.mock-tooltip .tt-tip{
  margin-top:4px; padding-top:14px; border-top:1px solid var(--line);
  font-size:14px; color:var(--muted);
}
.mock-tooltip .tt-tip strong{ color:var(--accent); font-weight:600; }

/* Create menu \u2014 shown on right-click only, above everything */
.ctx-menu{
  display:none;
  position:fixed;
  z-index:9999;
  min-width:220px;
  width:max-content;
  max-width:280px;
  background:#1e1e1e;
  border:1px solid #333;
  border-radius:8px;
  box-shadow:0 10px 32px rgba(0,0,0,0.65);
  padding:4px 0;
  pointer-events:none;
  user-select:none;
}
.ctx-menu.is-open{ display:block; }
.ctx-item{
  display:flex; align-items:center; gap:10px;
  padding:7px 14px;
  font-size:12px; color:#dadada;
  white-space:nowrap;
  line-height:1.35;
}
.ctx-item svg{
  width:14px; height:14px; flex-shrink:0; opacity:0.75; color:#aaa;
}
.ctx-item .hint{
  color:#888; margin-left:4px; flex-shrink:0;
}
.ctx-item .hint.corvidae{
  color:var(--accent);
}

.mock-main{
  display:flex; flex-direction:column; min-width:0;
  background:var(--obs-bg);
}
.mock-titlebar{
  display:flex; align-items:center; justify-content:space-between;
  padding:12px 16px 10px;
  flex-shrink:0;
}
.mock-titlebar h3{
  font-size:22px; font-weight:700; letter-spacing:0.02em; color:#fff;
}
.crow{
  font-size:20px; line-height:1;
  opacity:0.95; user-select:none;
}

.mock-grid{
  flex:1; min-height:0;
  display:grid;
  grid-template-columns:1fr 1fr;
  grid-template-rows:1fr 1fr;
  gap:8px;
  padding:0 10px 10px;
}

.pane{
  background:#1a1a1a;
  border:1px solid #2f2f2f;
  border-radius:3px;
  display:flex; flex-direction:column;
  min-height:0; overflow:hidden;
  cursor:default;
  transition:border-color 0.18s, box-shadow 0.18s;
  outline:none;
}
.pane:hover,
.pane:focus-within,
.pane.is-active{
  border-color:var(--accent);
  box-shadow:inset 0 0 0 1px rgba(255,19,55,0.35);
}
.pane-head{
  flex-shrink:0;
  text-align:center;
  font-size:11px;
  letter-spacing:0.04em;
  text-transform:uppercase;
  color:#9a9a9a;
  padding:7px 8px;
  background:#222;
  border-bottom:1px solid #2f2f2f;
  font-weight:500;
}
.pane-body{
  flex:1; min-height:0; position:relative; overflow:hidden;
}

/* Graph */
.graph-canvas{
  width:100%; height:100%;
  background:#161616;
}
.graph-canvas circle{ fill:#c8c8c8; }
.graph-canvas circle.hot{ fill:var(--accent); }
.graph-canvas circle.warn{ fill:var(--obs-yellow); }
.graph-canvas line{ stroke:#4a4a4a; stroke-width:0.8; }

/* Website */
.web-canvas{
  width:100%; height:100%;
  background:
    radial-gradient(1px 1px at 12% 18%, #fff 0, transparent 100%),
    radial-gradient(1px 1px at 28% 62%, #fff 0, transparent 100%),
    radial-gradient(1px 1px at 48% 22%, #aaa 0, transparent 100%),
    radial-gradient(1px 1px at 72% 44%, #fff 0, transparent 100%),
    radial-gradient(1px 1px at 88% 70%, #ccc 0, transparent 100%),
    radial-gradient(1px 1px at 60% 80%, #fff 0, transparent 100%),
    radial-gradient(1px 1px at 35% 40%, #fff 0, transparent 100%),
    #0a1020;
  position:relative;
}
.web-label{
  position:absolute; top:8px; font-family:var(--font-mono);
  font-size:9px; letter-spacing:0.1em; color:#fff;
}
.web-label.left{ left:8px; }
.web-label.right{ right:8px; color:var(--obs-yellow); }
.web-cube{
  position:absolute; left:50%; top:52%;
  width:52px; height:52px;
  margin:-26px 0 0 -26px;
  background:linear-gradient(135deg, #9ec9ff 0%, #4a8fd4 45%, #1e3a5f 100%);
  transform:rotateX(18deg) rotateZ(-18deg) skewY(-6deg);
  box-shadow:0 8px 20px rgba(0,0,0,0.5);
  border:1px solid rgba(180,210,255,0.45);
}
.web-sliders{
  position:absolute; right:6px; top:28px; bottom:10px; width:10px;
  display:flex; flex-direction:column; gap:4px; justify-content:center;
}
.web-sliders span{
  display:block; height:2px; background:rgba(100,160,255,0.55); border-radius:1px;
}

/* Tickets */
.ticket-scroll{
  padding:8px; height:100%; overflow:hidden;
  font-size:10px; line-height:1.45; color:var(--obs-ink);
}
.ticket-card{
  background:#1a1a1a; border:1px solid #2f2f2f; border-radius:3px;
  overflow:hidden;
}
.ticket-card-head{
  background:var(--obs-blue); color:#fff;
  font-size:10px;
  padding:6px 8px; letter-spacing:0.01em;
  display:flex; align-items:center; gap:6px;
}
.ticket-card-head::before{
  content:"\u270E"; font-size:9px; opacity:0.9;
}
.ticket-card-body{
  padding:8px; color:#9a9a9a;
}
.ticket-card-body strong{ color:#dadada; font-weight:500; }
.ticket-card-body .path{ color:var(--accent); font-family:var(--font-mono); font-size:9px; }
.ticket-card-body p{ margin:0 0 4px; }

/* Console \u2014 only $ + red blink */
.term-body{
  padding:10px 12px; height:100%;
  background:#121212;
  font-family:var(--font-mono); font-size:13px; line-height:1.55;
  color:#dadada;
  display:flex; align-items:flex-start;
}
.term-body .prompt{ color:#dadada; margin-right:6px; }
.term-cursor{
  display:inline-block; width:7px; height:14px; background:var(--accent);
  vertical-align:text-bottom;
  animation:blink 1.05s steps(1) infinite;
}
@keyframes blink{
  0%,49%{ opacity:1; }
  50%,100%{ opacity:0; }
}

/* Right sidebar */
.mock-side{
  background:#1a1a1a;
  border-left:1px solid var(--obs-line);
  display:flex; flex-direction:column;
  overflow:hidden;
}
.side-props{
  padding:14px 12px; border-bottom:1px solid var(--obs-line);
  color:#777; font-size:12px; flex-shrink:0;
}
.side-create{
  padding:12px 10px; display:flex; flex-direction:column; gap:10px;
}
.side-block h4{
  font-size:11px; letter-spacing:0.02em;
  color:#dadada; margin-bottom:6px; font-weight:600;
}
.side-input{
  background:#111; border:1px solid #2f2f2f; border-radius:3px;
  height:56px; color:#777; font-size:11px;
  padding:8px; 
}
.side-btn{
  display:block; margin-top:6px; margin-left:auto;
  background:var(--accent); color:#fff; border:none;
  font-size:11px; font-weight:600;
  padding:4px 12px; border-radius:3px; cursor:default;
}

/* ---------- CODEBLOCK MOCK ---------- */
.cb-mock{
  max-width:var(--mock-max);
  margin:0 auto;
  background:var(--obs-bg);
  border:1px solid var(--obs-line);
  border-radius:4px;
  overflow:hidden;
  box-shadow:0 12px 40px rgba(0,0,0,0.45);
  --cb-t: 0;
}
.cb-chrome{
  display:flex; align-items:center; justify-content:space-between;
  padding:8px 12px;
  background:#1a1a1a;
  border-bottom:1px solid var(--obs-line);
  font-family:var(--font-mono); font-size:11px;
  letter-spacing:0.06em;
}
.cb-chrome .lang{ color:var(--accent); font-weight:600; }
.cb-chrome .hint{ color:var(--obs-muted); font-size:10px; letter-spacing:0.04em; }
.cb-stage{
  position:relative;
  height:calc(var(--mock-view-h) - 49px);
  overflow:hidden;
  background:#141414;
  scrollbar-width:none;
}
.cb-stage::-webkit-scrollbar{ display:none; width:0; height:0; }
.cb-layer{
  position:absolute; inset:0;
  transition:opacity 0.12s linear, transform 0.12s linear;
  pointer-events:none;
}
.cb-code{
  margin:0;
  padding:10px 12px;
  font-family:var(--font-mono); font-size:8.5px; line-height:1.4;
  color:#b0b0b0;
  overflow:auto;
  white-space:pre;
  tab-size:2;
  opacity:calc(1 - var(--cb-t));
  transform:translateX(calc(var(--cb-t) * -18px));
  box-sizing:border-box;
  scrollbar-width:none;
}
.cb-code::-webkit-scrollbar{ display:none; width:0; height:0; }
.cb-html{
  padding:0;
  background:#0c0a0b;
  opacity:var(--cb-t);
  transform:translateX(calc((1 - var(--cb-t)) * 18px));
  overflow:hidden;
}
.cb-html iframe{
  width:100%; height:100%;
  border:0; display:block;
  background:#0c0a0b;
  pointer-events:none;
}
.cb-slider{
  display:flex; align-items:center; gap:12px;
  padding:12px 16px;
  background:#1a1a1a;
  border-top:1px solid var(--obs-line);
}
.cb-slider .lbl{
  font-family:var(--font-mono); font-size:10px;
  letter-spacing:0.1em; text-transform:uppercase;
  color:var(--obs-muted); min-width:36px;
}
.cb-slider .lbl.is-on{ color:var(--accent); }
.cb-slider input[type="range"]{
  flex:1; height:4px; appearance:none; -webkit-appearance:none;
  background:#333; border-radius:2px; outline:none; cursor:pointer;
}
.cb-slider input[type="range"]::-webkit-slider-thumb{
  appearance:none; -webkit-appearance:none;
  width:16px; height:16px; border-radius:50%;
  background:var(--accent); border:2px solid #1a1a1a;
  box-shadow:0 0 0 1px var(--accent-dim);
  cursor:pointer;
}
.cb-slider input[type="range"]::-moz-range-thumb{
  width:16px; height:16px; border-radius:50%;
  background:var(--accent); border:2px solid #1a1a1a;
  cursor:pointer;
}

/* ---------- GRAPH VIEW MOCK ---------- */
.gv-mock{
  max-width:var(--mock-max);
  margin:0 auto;
  background:var(--obs-bg);
  border:1px solid var(--obs-line);
  border-radius:4px;
  overflow:hidden;
  box-shadow:0 12px 40px rgba(0,0,0,0.45);
}
.gv-chrome{
  display:flex; align-items:center; justify-content:space-between;
  padding:8px 12px;
  background:#1a1a1a;
  border-bottom:1px solid var(--obs-line);
  font-family:var(--font-mono); font-size:11px;
  letter-spacing:0.06em;
}
.gv-chrome .lang{ color:var(--accent); }
.gv-chrome .hint{ color:var(--obs-muted); font-size:10px; letter-spacing:0.04em; }
.gv-stage{
  height:var(--mock-view-h);
  background:#161616;
  overflow:hidden;
  touch-action:none;
  cursor:default;
}
.gv-stage.is-dragging-node{ cursor:grabbing; }
.gv-canvas{
  width:100%; height:100%;
  display:block;
}
.gv-canvas line{
  stroke:#4a4a4a; stroke-width:1;
  pointer-events:none;
}
.gv-canvas .gv-hit{
  fill:transparent;
  stroke:none;
  cursor:grab;
}
.gv-canvas .gv-node.is-drag .gv-hit{ cursor:grabbing; }
.gv-canvas .node-main{
  fill:#000000; stroke:#555; stroke-width:1.2;
  pointer-events:none;
}
.gv-canvas .node-note{
  fill:#888888; stroke:none;
  pointer-events:none;
}
.gv-canvas text{
  fill:#9a858c;
  font-family:var(--font-mono);
  font-size:9px;
  letter-spacing:0.04em;
  pointer-events:none;
  user-select:none;
}
.gv-canvas text.lbl-main{
  dominant-baseline:hanging;
}
.gv-canvas text.lbl-side{
  dominant-baseline:central;
}

/* ---------- SMALL FEATURES MOCK (04) ---------- */
@property --sf-t {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}
.sf-grid{
  max-width:var(--mock-max);
  margin:0 auto;
  display:grid;
  grid-template-columns:repeat(3, 1fr);
  gap:12px;
}
.sf-tile{
  background:var(--obs-bg);
  border:1px solid var(--obs-line);
  border-radius:4px;
  overflow:hidden;
  box-shadow:0 8px 28px rgba(0,0,0,0.4);
  display:flex;
  flex-direction:column;
  min-height:0;
  --sf-t: 1;
  transition:--sf-t 0.35s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}
.sf-tile.is-empty .sf-stage{
  display:flex; align-items:center; justify-content:center;
  color:var(--obs-muted);
  font-family:var(--font-mono); font-size:18px;
  letter-spacing:0.2em;
}
.sf-chrome{
  display:flex; align-items:center; justify-content:space-between;
  padding:6px 10px;
  background:#1a1a1a;
  border-bottom:1px solid var(--obs-line);
  font-family:var(--font-mono); font-size:10px;
  letter-spacing:0.06em;
  gap:8px;
}
.sf-chrome .lang{ color:var(--accent); font-weight:600; }
.sf-badge{
  display:inline-grid;
  font-size:9px; letter-spacing:0.12em; text-transform:uppercase;
  color:var(--obs-muted);
  border:1px solid var(--obs-line);
  padding:2px 6px; border-radius:2px;
}
.sf-badge .sf-badge-before,
.sf-badge .sf-badge-after{
  grid-area:1 / 1;
  transition:opacity 0.25s ease;
}
.sf-badge .sf-badge-before{ opacity:0; }
.sf-badge .sf-badge-after{ opacity:1; }
.sf-tile:not(.is-empty):hover,
.sf-tile:not(.is-empty):focus-within{
  --sf-t: 0;
  border-color:#3a3a3a;
  box-shadow:0 10px 32px rgba(0,0,0,0.5);
}
.sf-tile:not(.is-empty):hover .sf-badge .sf-badge-before,
.sf-tile:not(.is-empty):focus-within .sf-badge .sf-badge-before{ opacity:1; }
.sf-tile:not(.is-empty):hover .sf-badge .sf-badge-after,
.sf-tile:not(.is-empty):focus-within .sf-badge .sf-badge-after{ opacity:0; }
.sf-stage{
  position:relative;
  height:168px;
  background:#141414;
  overflow:hidden;
}
.sf-layer{
  position:absolute; inset:0;
  padding:10px 12px;
  box-sizing:border-box;
  pointer-events:none;
  display:flex; flex-direction:column; justify-content:center;
  transition:opacity 0.35s ease, transform 0.35s ease;
}
.sf-layer > *{ flex-shrink:0; }
.sf-before{
  opacity:calc(1 - var(--sf-t));
  transform:translateY(calc(var(--sf-t) * -6px));
}
.sf-after{
  opacity:var(--sf-t);
  transform:translateY(calc((1 - var(--sf-t)) * 6px));
}
.sf-note-bar{
  font-family:var(--font-mono); font-size:9px;
  color:var(--obs-muted); letter-spacing:0.04em;
  padding-bottom:6px; margin-bottom:6px;
  border-bottom:1px solid #2a2a2a;
  text-align:center;
}
.sf-note-title{
  font-family:var(--font-display); font-weight:800;
  font-size:15px; color:var(--ink); margin:0 0 6px;
  letter-spacing:-0.02em;
}
.sf-note-body{
  font-family:var(--font-body); font-size:11px;
  color:#9a858c; line-height:1.45; margin:0;
}
.sf-code-line{
  font-family:var(--font-mono); font-size:9px;
  color:#b0b0b0; margin:0 0 8px;
  text-align:center;
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
.sf-code-line em{ color:var(--accent); font-style:normal; }
/* Mini Graph View window \u2014 same visual language as section 03 (.gv-*) */
.sf-graph-pane{
  position:relative;
  display:flex; align-items:center; justify-content:center;
  border:1px solid var(--obs-line);
  border-radius:3px;
  background:#161616;
  overflow:hidden;
}
.sf-graph-cap{
  position:absolute; top:3px; left:5px;
  font-family:var(--font-mono); font-size:7px;
  letter-spacing:0.1em; text-transform:uppercase;
  color:#6a6a6a;
  pointer-events:none;
}
.sf-mini-graph{
  width:100%; height:104px; display:block;
}
.sf-mini-graph .sf-edge{
  stroke:#4a4a4a; stroke-width:1.2;
}
.sf-node-dot{ fill:#888888; }
.sf-node-main{ fill:#000000; stroke:#555555; stroke-width:1.2; }
.sf-node-lbl{
  fill:#9a858c; font-family:var(--font-mono);
  font-size:8px; text-anchor:middle;
}
/* Development folders tile: explorer tree next to the graph */
.sf-dev-cols{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:8px;
  align-items:start;
}
.sf-dev-cols .sf-graph-pane{ height:118px; }
.sf-dev-cols .sf-mini-graph{ height:118px; }
.sf-dev-tree{
  height:118px;
  box-sizing:border-box;
  border:1px solid var(--obs-line);
  border-radius:3px;
  background:#1a1a1a;
  padding:5px 4px;
  overflow:hidden;
  font-family:var(--font-mono); font-size:8px;
  letter-spacing:0.02em;
  line-height:1.7;
  color:#b0b0b0;
}
.sf-dev-row{
  display:flex; align-items:center; justify-content:space-between;
  gap:4px; padding-left:2px;
  white-space:nowrap;
}
.sf-dev-row .sf-dev-name{
  display:flex; align-items:center; gap:4px;
  min-width:0; overflow:hidden; text-overflow:ellipsis;
}
.sf-dev-row .sf-dev-tag{
  flex-shrink:0; font-size:7px; letter-spacing:0.06em;
  color:#777; text-transform:uppercase;
}
.sf-dev-row.is-sealed .sf-dev-tag{ color:var(--accent); }
.sf-dev-caret{
  width:7px; flex-shrink:0; color:#8a8a8a;
  font-size:6px; line-height:1;
}
.sf-dev-caret.is-locked{ color:var(--accent); }
.sf-dev-kids{
  position:relative;
  padding-left:9px;
}
.sf-dev-kids::before{
  content:"";
  position:absolute; left:4px; top:0; bottom:2px;
  width:1px; background:#333;
}
.sf-dev-hidden{
  color:#5f5f5f; font-style:italic;
  padding-left:11px;
}
.sf-caption{
  font-family:var(--font-mono); font-size:8px;
  letter-spacing:0.06em; color:var(--obs-muted);
  margin:6px 0 0;
}
.sf-caption em{ color:var(--accent); font-style:normal; }
.sf-footer{
  margin:0;
  padding:7px 10px;
  text-align:center;
  font-family:var(--font-mono); font-size:8px;
  letter-spacing:0.06em; color:var(--obs-muted);
  background:#1a1a1a;
  border-top:1px solid var(--obs-line);
}
.sf-footer em{ color:var(--accent); font-style:normal; }
/* Vault profile bar \u2014 graph + crow replace the left ribbon */
.sf-vault-scene{
  display:flex; flex-direction:column; gap:8px;
  height:100%; justify-content:center;
}
.sf-vault-ribbon{
  display:flex; flex-direction:column; align-items:center; gap:6px;
  width:22px; padding:6px 0;
  border:1px solid var(--obs-line); border-radius:3px;
  background:#1a1a1a; color:#8a8a8a;
  align-self:flex-start;
}
.sf-vault-ribbon svg{ width:12px; height:12px; display:block; opacity:0.85; }
.sf-vault-ribbon.is-gone{
  opacity:0.28;
  border-style:dashed;
}
.sf-vault-ribbon.is-gone svg{ opacity:0.35; }
.sf-vault-bar{
  display:flex; align-items:center; justify-content:space-between;
  gap:8px; padding:7px 9px;
  border:1px solid var(--obs-line); border-radius:3px;
  background:#1a1a1a;
  font-family:var(--font-mono); font-size:10px;
  color:var(--obs-ink); letter-spacing:0.04em;
}
.sf-vault-bar .sf-vault-icons{
  display:flex; align-items:center; gap:7px;
  color:#9a9a9a;
}
.sf-vault-bar .sf-vault-icons svg{
  width:13px; height:13px; display:block; opacity:0.9;
}
.sf-vault-bar .sf-vault-icons .is-accent{ color:var(--accent); opacity:1; }
.sf-table{
  width:100%; border-collapse:collapse;
  font-family:var(--font-mono); font-size:10px;
}
.sf-table th,
.sf-table td{
  border:1px solid #2a2a2a;
  padding:4px 8px;
  text-align:left;
  color:#b0b0b0;
}
.sf-table th{ color:var(--obs-muted); font-weight:500; background:#1a1a1a; }
.sf-table .sf-sum-raw{ color:var(--accent); }
.sf-table .sf-sum-val{
  color:var(--ink); font-weight:600;
  box-shadow:inset 0 0 0 1px rgba(255,19,55,0.45);
}
/* Mini Properties / Frontmatter panel */
.sf-layer--props{
  justify-content:flex-start;
  padding:4px 0 0;
}
.sf-props{
  display:flex; flex-direction:column;
  width:100%;
  font-family:var(--font-mono);
  font-size:9px;
  line-height:1.2;
}
.sf-props-row{
  display:grid;
  grid-template-columns:14px 52px minmax(0, 1fr);
  align-items:start;
  gap:6px;
  padding:5px 10px;
  border-bottom:1px solid #2a2a2a;
  color:#9a9a9a;
}
.sf-props-row:last-child{ border-bottom:none; }
.sf-props-ico{
  width:12px; height:12px;
  margin-top:1px;
  color:#7a7a7a;
  flex-shrink:0;
}
.sf-props-ico svg{ width:12px; height:12px; display:block; }
.sf-props-key{
  color:#8a8a8a;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.sf-props-val{
  min-width:0;
  color:var(--ink);
  display:flex; flex-wrap:wrap; align-items:center; gap:4px;
}
.sf-props-val.is-stack{
  flex-direction:column; align-items:flex-start; gap:2px;
}
.sf-props-pill{
  display:inline-flex; align-items:center;
  padding:1px 6px;
  border-radius:999px;
  background:rgba(255,19,55,0.14);
  color:var(--accent);
  font-size:8px;
  letter-spacing:0.02em;
}
.sf-props-pill.is-muted{
  background:#2a2a2a;
  color:#c8c8c8;
}
.sf-props-link{
  color:var(--accent);
  text-decoration:underline;
  text-underline-offset:2px;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  max-width:100%;
}
.sf-props-num{ color:var(--ink); font-weight:600; }
.sf-props-dot{
  width:8px; height:8px; border-radius:50%;
  flex-shrink:0;
  background:#888888;
  box-shadow:inset 0 0 0 1px rgba(255,255,255,0.12);
}

@media (max-width:820px){
  .sf-grid{ grid-template-columns:repeat(2, 1fr); }
}
@media (max-width:520px){
  .sf-grid{ grid-template-columns:1fr; }
  .yc-steps{ grid-template-columns:1fr; }
}

/* ---------- COMING SOON (05\u201307) ---------- */
.coming-soon-wrap{ position:relative; }
.coming-soon-overlay{
  position:absolute; inset:0; z-index:40;
  background:rgba(12,10,11,0.42);
  display:flex; align-items:center; justify-content:center;
  overflow:hidden;
  pointer-events:auto;
}
.coming-soon-banner{
  position:absolute;
  left:50%; top:50%;
  width:150%;
  transform:translate(-50%,-50%) rotate(-16deg);
  text-align:center;
  font-family:var(--font-display);
  font-weight:800;
  font-size:clamp(26px, 4.5vw, 44px);
  letter-spacing:0.2em;
  text-transform:uppercase;
  color:#fff;
  background:var(--accent);
  padding:16px 24px;
  border-top:2px solid rgba(255,255,255,0.22);
  border-bottom:2px solid rgba(0,0,0,0.4);
  box-shadow:0 10px 36px rgba(0,0,0,0.55);
  white-space:nowrap;
}

/* ---------- CUSTOM GRAPH MOCK ---------- */
.dbg-mock{
  --dbg-folder:#4a90d9;
  --dbg-file:#6b7280;
  --dbg-function:#c9842c;
  --dbg-bonus:#e03131;
  max-width:var(--mock-max);
  margin:0 auto;
  background:var(--obs-bg);
  border:1px solid var(--obs-line);
  border-radius:4px;
  overflow:hidden;
  box-shadow:0 12px 40px rgba(0,0,0,0.45);
  position:relative;
  display:flex;
  flex-direction:column;
}
.dbg-chrome{
  display:flex; align-items:center; gap:8px;
  padding:8px 12px;
  background:#1a1a1a;
  border-bottom:1px solid var(--obs-line);
  font-family:var(--font-mono); font-size:11px;
  letter-spacing:0.04em;
  color:var(--obs-ink);
}
.dbg-chrome .dbg-title{
  display:inline-flex; align-items:center; gap:8px;
  font-weight:600; color:var(--ink);
}
.dbg-chrome .dbg-title svg{
  width:14px; height:14px; display:block; color:var(--obs-muted);
}
.dbg-toolbar{
  display:flex; align-items:center; justify-content:center;
  gap:12px; flex-wrap:wrap;
  padding:8px 12px;
  border-bottom:1px solid var(--obs-line);
  background:#161616;
}
.dbg-bonus{
  width:32px; height:32px; padding:0;
  display:inline-flex; align-items:center; justify-content:center;
  border-radius:6px;
  border:1px solid var(--obs-line);
  background:#1a1a1a;
  color:var(--obs-muted);
  cursor:pointer;
}
.dbg-bonus svg{ width:18px; height:18px; display:block; }
.dbg-bonus.is-active{
  color:var(--dbg-bonus);
  border-color:rgba(224,49,49,0.45);
  background:rgba(224,49,49,0.12);
}
.dbg-edge-control{
  display:flex; align-items:center; gap:10px;
  font-family:var(--font-mono); font-size:11px;
  color:var(--obs-muted);
}
.dbg-edge-control input[type="range"]{
  width:140px; max-width:28vw;
  accent-color:var(--accent);
}
.dbg-stage{
  position:relative;
  height:var(--mock-view-h);
  background:#141414;
  overflow:hidden;
  touch-action:none;
}
.dbg-stage.is-dragging-node{ cursor:grabbing; }
.dbg-stage.is-panning{ cursor:grabbing; }
.dbg-canvas{ width:100%; height:100%; display:block; }
.dbg-viewport{ transform-origin:0 0; }
.dbg-canvas .dbg-edge{
  stroke:#3a3a3a; stroke-width:1.25; stroke-opacity:0.85;
  pointer-events:none;
}
.dbg-canvas .dbg-edge.is-function{
  stroke:var(--dbg-function);
  stroke-width:0.75; stroke-opacity:0.28;
}
.dbg-node{ cursor:grab; }
.dbg-node.is-drag{ cursor:grabbing; }
.dbg-node.is-function{ cursor:default; }
.dbg-node-circle{
  stroke:#141414; stroke-width:1.5;
}
.dbg-node.is-folder .dbg-node-circle{ fill:var(--dbg-folder); }
.dbg-node.is-file .dbg-node-circle{ fill:var(--dbg-file); }
.dbg-node.is-function .dbg-node-circle{
  fill:var(--dbg-function); stroke-width:1;
}
.dbg-node.is-function:hover .dbg-node-circle,
.dbg-node.is-function:focus-within .dbg-node-circle{
  stroke:#e8e8e8; stroke-width:1.5;
}
.dbg-node-label{
  fill:#e8e8e8;
  font-family:var(--font-mono);
  font-size:11px;
  pointer-events:none;
  user-select:none;
}
.dbg-node.is-function .dbg-node-label{
  fill:var(--obs-muted);
  font-size:10px;
  opacity:0;
}
.dbg-node.is-function:hover .dbg-node-label,
.dbg-node.is-function:focus-within .dbg-node-label{
  opacity:1;
}
.dbg-mock.is-functions-off .dbg-node.is-function,
.dbg-mock.is-functions-off .dbg-edge.is-function{
  display:none;
}

/* ---------- CODING EDITOR MOCK ---------- */
.ed-mock{
  max-width:var(--mock-max);
  margin:0 auto;
  background:var(--obs-bg);
  border:1px solid var(--obs-line);
  border-radius:4px;
  overflow:hidden;
  box-shadow:0 12px 40px rgba(0,0,0,0.45);
  position:relative;
}
.ed-chrome{
  display:flex; align-items:center; justify-content:space-between;
  padding:8px 12px;
  background:#1a1a1a;
  border-bottom:1px solid var(--obs-line);
  font-family:var(--font-mono); font-size:11px;
  letter-spacing:0.06em;
}
.ed-chrome .lang{ color:var(--accent); font-weight:600; }
.ed-chrome .hint{ color:var(--obs-muted); font-size:10px; }
.ed-body{
  display:grid;
  grid-template-columns:240px 1fr;
  height:calc(var(--mock-view-h) - 49px);
  min-height:0;
}
.ed-timeline{
  border-right:1px solid var(--obs-line);
  background:#181818;
  padding:14px 12px 10px;
  display:flex; flex-direction:column; gap:10px;
  min-height:0; overflow:auto;
}
.ed-timeline-title{
  font-family:var(--font-mono); font-size:10px; letter-spacing:0.12em;
  text-transform:uppercase; color:var(--obs-muted);
}
.ed-branch-svg{ width:100%; height:220px; display:block; }
.ed-branch-svg .lane{ stroke:#333; stroke-width:2; fill:none; }
.ed-branch-svg .lane.feature{ stroke:#3d5a73; }
.ed-branch-svg .commit{
  fill:#888; stroke:#1e1e1e; stroke-width:2; cursor:pointer;
}
.ed-branch-svg .commit.is-on{ fill:var(--accent); }
.ed-branch-svg .commit.main{ fill:var(--obs-blue); }
.ed-branch-svg .commit.main.is-on{ fill:var(--accent); }
.ed-branch-svg text{
  fill:var(--obs-muted); font-family:var(--font-mono); font-size:9px;
  pointer-events:none;
}
.ed-commit-meta{
  font-family:var(--font-mono); font-size:10px; color:var(--obs-ink);
  line-height:1.5; padding:8px; background:#141414; border:1px solid var(--obs-line);
  border-radius:3px; min-height:56px;
}
.ed-commit-meta .hash{ color:var(--obs-yellow); }
.ed-commit-meta .msg{ color:var(--obs-muted); }
.ed-editor{
  display:flex; flex-direction:column; min-width:0; min-height:0;
  background:#1e1e1e; overflow:hidden;
}
.ed-tabbar{
  display:flex; align-items:center; gap:8px;
  padding:8px 12px; border-bottom:1px solid var(--obs-line);
  background:#1a1a1a;
  font-family:var(--font-mono); font-size:11px; color:var(--obs-ink);
}
.ed-tabbar .ext{ color:var(--obs-blue); }
.ed-code{
  flex:1; margin:0; padding:12px 0;
  font-family:var(--font-mono); font-size:12px; line-height:1.55;
  overflow:auto; color:var(--obs-ink);
}
.ed-line{
  display:grid; grid-template-columns:44px 18px 1fr;
  padding:0 12px 0 0;
}
.ed-line .num{ color:#555; text-align:right; padding-right:10px; user-select:none; }
.ed-line .mark{ text-align:center; user-select:none; }
.ed-line .src{ white-space:pre; overflow:hidden; text-overflow:ellipsis; }
.ed-line.del{ background:rgba(255,80,80,0.08); }
.ed-line.del .mark{ color:#e06c75; }
.ed-line.add{ background:rgba(61,214,140,0.08); }
.ed-line.add .mark{ color:var(--ok); }
.ed-line .kw{ color:var(--obs-blue); }
.ed-line .str{ color:var(--obs-yellow); }
.ed-line .cm{ color:#6a6a6a; }
.ed-scrub{
  border-top:1px solid var(--obs-line);
  background:#1a1a1a;
  padding:12px 16px;
  display:flex; align-items:center; gap:14px;
}
.ed-scrub .lbl{
  font-family:var(--font-mono); font-size:10px; letter-spacing:0.1em;
  text-transform:uppercase; color:var(--obs-muted); white-space:nowrap;
}
.ed-scrub input[type="range"]{
  flex:1; height:4px; appearance:none; -webkit-appearance:none;
  background:#333; border-radius:2px; outline:none; cursor:pointer;
}
.ed-scrub input[type="range"]::-webkit-slider-thumb{
  appearance:none; -webkit-appearance:none;
  width:14px; height:14px; border-radius:50%;
  background:var(--accent); border:2px solid #1a1a1a; cursor:pointer;
}
.ed-scrub input[type="range"]::-moz-range-thumb{
  width:14px; height:14px; border-radius:50%;
  background:var(--accent); border:2px solid #1a1a1a; cursor:pointer;
}
.ed-scrub .axis-open{
  font-family:var(--font-mono); font-size:10px; color:var(--obs-blue);
  letter-spacing:0.06em;
}

/* ---------- NEURAL NETWORK MOCK ---------- */
.nn-mock{
  max-width:var(--mock-max);
  margin:0 auto;
  background:var(--obs-bg);
  border:1px solid var(--obs-line);
  border-radius:4px;
  overflow:hidden;
  box-shadow:0 12px 40px rgba(0,0,0,0.45);
  position:relative;
}
.nn-chrome{
  display:flex; align-items:center; justify-content:space-between;
  padding:8px 12px;
  background:#1a1a1a;
  border-bottom:1px solid var(--obs-line);
  font-family:var(--font-mono); font-size:11px;
  letter-spacing:0.06em;
}
.nn-chrome .lang{ color:var(--accent); font-weight:600; }
.nn-chrome .hint{ color:var(--obs-muted); font-size:10px; }
.nn-body{
  display:grid;
  grid-template-columns:1.4fr 0.9fr;
  height:var(--mock-view-h);
  min-height:0;
  background:#161616;
}
.nn-vis{
  position:relative;
  border-right:1px solid var(--obs-line);
  min-height:0;
  height:100%;
}
.nn-canvas{ width:100%; height:100%; display:block; }
.nn-canvas .nn-edge{
  stroke:#4a90e2; fill:none; stroke-width:1.2;
  opacity:0.35; pointer-events:none;
}
.nn-canvas .nn-edge.is-pulse{
  stroke:var(--accent); opacity:0.95; stroke-width:2.2;
}
.nn-canvas .nn-node{
  fill:#1e1e1e; stroke:#555; stroke-width:1.4;
}
.nn-canvas .nn-node.is-on{
  fill:#1a2838; stroke:var(--obs-blue);
}
.nn-canvas .nn-node.is-pulse{
  stroke:var(--accent); fill:#2a1518;
}
.nn-canvas text{
  font-family:var(--font-mono); fill:var(--obs-muted); font-size:9px;
  pointer-events:none; user-select:none;
}
.nn-canvas .nn-val{
  fill:var(--obs-ink); font-size:9px; text-anchor:middle;
  dominant-baseline:central;
}
.nn-canvas .nn-layer-lbl{
  fill:var(--obs-muted); font-size:10px; letter-spacing:0.12em;
  text-anchor:middle; text-transform:uppercase;
}
.nn-train{
  padding:16px 16px 14px;
  display:flex; flex-direction:column; gap:14px;
  background:#1a1a1a;
}
.nn-train-title{
  font-family:var(--font-mono); font-size:11px; letter-spacing:0.14em;
  color:var(--accent); text-transform:uppercase;
}
.nn-block{
  border:1px solid var(--obs-line); background:#141414;
  border-radius:3px; padding:10px 12px;
}
.nn-block .k{
  font-family:var(--font-mono); font-size:9px; letter-spacing:0.1em;
  text-transform:uppercase; color:var(--obs-muted); margin-bottom:6px;
}
.nn-block .v{
  font-family:var(--font-mono); font-size:12px; color:var(--obs-ink);
  word-break:break-all;
}
.nn-block .v.vec{ color:var(--obs-blue); }
.nn-spark{
  width:100%; height:48px; display:block;
}
.nn-spark polyline{
  fill:none; stroke:var(--obs-blue); stroke-width:1.5;
}
.nn-spark line{ stroke:#2a2a2a; stroke-width:1; }
.nn-btn{
  appearance:none; border:1px solid var(--accent-dim);
  background:rgba(255,19,55,0.12); color:var(--accent);
  font-family:var(--font-mono); font-size:11px; letter-spacing:0.1em;
  text-transform:uppercase; padding:10px 14px; border-radius:3px;
  cursor:pointer; text-align:center;
}
.nn-btn:hover{ background:rgba(255,19,55,0.2); }
.nn-btn:disabled{ opacity:0.45; cursor:default; }
.nn-foot{
  margin-top:auto;
  font-family:var(--font-mono); font-size:10px; letter-spacing:0.06em;
  color:var(--obs-muted); padding-top:4px;
}

/* ---------- YOUR CODE (08) ---------- */
.yc-steps{
  display:grid;
  grid-template-columns:repeat(4, 1fr);
  gap:14px;
  max-width:var(--mock-max);
  margin:8px auto 0;
}
.yc-step{
  border:1px solid var(--line);
  background:var(--panel);
  border-radius:4px;
  padding:22px 18px 20px;
  transition:border-color 0.2s ease, background 0.2s ease;
}
.yc-step:hover,
.yc-step:focus-within{
  border-color:var(--accent-dim);
  background:#1f181b;
}
.yc-step-num{
  font-family:var(--font-mono); font-size:22px; font-weight:600;
  letter-spacing:0.08em; color:var(--accent);
  display:block; margin-bottom:12px; line-height:1;
}
.yc-step-title{
  font-family:var(--font-display); font-weight:700;
  font-size:16px; letter-spacing:-0.01em;
  color:var(--ink); margin:0 0 8px;
}
.yc-step p{
  font-size:13px; line-height:1.55; color:var(--muted); margin:0;
}
.yc-step a{
  color:var(--accent); text-decoration:none;
  border-bottom:1px solid transparent;
  transition:border-color 0.15s ease;
}
.yc-step a:hover{ border-bottom-color:var(--accent); }

/* ---------- ABOUT (09) ---------- */
#about{ padding:96px 0 100px; border-top:1px solid var(--line); }
.about-wrap{ max-width:1080px; margin:0 auto; }

.about-manifesto{
  text-align:center;
  margin-bottom:72px;
  opacity:0;
  transform:translateY(18px);
  transition:opacity 0.7s ease, transform 0.7s ease;
}
.about-manifesto.is-in{
  opacity:1; transform:translateY(0);
}
.about-num{
  font-family:var(--font-mono); font-size:11px; color:var(--accent);
  letter-spacing:0.18em; display:block; margin-bottom:18px;
}
.about-display{
  font-family:var(--font-display); font-weight:800;
  font-size:clamp(32px, 5.5vw, 56px);
  letter-spacing:-0.02em; line-height:1.05;
  color:var(--ink); margin:0 0 20px;
  max-width:18ch; margin-left:auto; margin-right:auto;
}
.about-lead{
  color:var(--muted); font-size:17px; line-height:1.6;
  max-width:520px; margin:0 auto 28px;
}
.about-facts{
  display:flex; flex-wrap:wrap; justify-content:center; gap:10px 28px;
  padding-top:22px; border-top:1px solid var(--line);
  max-width:520px; margin:0 auto;
  font-family:var(--font-mono); font-size:11px; letter-spacing:0.08em;
  text-transform:uppercase; color:var(--muted);
}
.about-facts span{ color:var(--ink); }
.about-facts a{ color:var(--accent); text-decoration:none; }

/* Orbit slideshow \u2014 one circle per view */
.about-orbit{
  --orbit-size:min(92vw, 560px);
  margin:0 auto 56px;
  max-width:720px;
}
.about-orbit-stage{
  position:relative;
  width:var(--orbit-size);
  height:var(--orbit-size);
  margin:0 auto;
  overflow:hidden;
  border-radius:50%;
}
.about-orbit-track{
  display:flex;
  height:100%;
  width:400%;
  transition:transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  will-change:transform;
}
.about-orbit-slide{
  flex:0 0 25%;
  width:25%;
  height:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:0;
}
.about-circle{
  width:100%;
  height:100%;
  border-radius:50%;
  border:1px solid var(--line);
  background:
    radial-gradient(circle at 32% 28%, rgba(255,19,55,0.16), transparent 42%),
    radial-gradient(circle at 70% 78%, rgba(0,0,0,0.55), transparent 50%),
    rgba(18,14,16,0.92);
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  text-align:center;
  padding:14% 16%;
  box-sizing:border-box;
  position:relative;
}
.about-circle.is-muted{
  background:
    radial-gradient(circle at 40% 30%, rgba(120,120,130,0.1), transparent 45%),
    rgba(14,12,14,0.95);
}
.about-circle.is-classified{
  background:
    radial-gradient(circle at 50% 40%, rgba(60,60,70,0.18), transparent 50%),
    rgba(12,11,13,0.96);
  border-style:dashed;
}
.about-eyebrow{
  font-family:var(--font-mono); font-size:10px; letter-spacing:0.16em;
  text-transform:uppercase; color:var(--muted); margin:0 0 10px;
}
.about-circle-title{
  font-family:var(--font-display); font-weight:800;
  font-size:clamp(22px, 4.6vw, 38px);
  letter-spacing:-0.025em; line-height:0.98;
  color:var(--ink); margin:0 0 10px;
}
.about-circle-title em{ font-style:normal; color:var(--accent); }
.about-circle.is-classified .about-circle-title{
  font-family:var(--font-mono); font-size:clamp(14px, 2.8vw, 18px);
  letter-spacing:0.08em; text-transform:uppercase; font-weight:500;
  color:var(--obs-muted);
}
.about-circle-sub{
  font-family:var(--font-display); font-weight:700;
  font-size:clamp(13px, 2vw, 16px);
  letter-spacing:-0.01em; color:var(--ink);
  margin:0 0 10px;
}
.about-circle-pitch{
  color:var(--muted); font-size:clamp(12px, 1.8vw, 14px); line-height:1.45;
  margin:0 0 14px; max-width:34ch;
}
.about-redacted{
  position:relative;
  display:inline-block;
  font-family:var(--font-mono);
  font-size:clamp(14px, 2.2vw, 18px);
  letter-spacing:0.1em;
  color:var(--muted);
  user-select:none;
  margin:0 0 10px;
  line-height:1.3;
  cursor:default;
  min-width:12ch;
}
.about-redacted-mask,
.about-redacted-code{
  display:block;
  transition:opacity 0.25s ease, filter 0.25s ease;
}
.about-redacted-mask{
  filter:blur(3.5px);
  opacity:1;
}
.about-redacted-code{
  position:absolute;
  left:50%; top:50%;
  transform:translate(-50%, -50%);
  white-space:nowrap;
  color:rgba(180,190,210,0.9);
  letter-spacing:0.06em;
  font-size:clamp(11px, 1.8vw, 13px);
  filter:blur(0);
  opacity:0;
  pointer-events:none;
}
.about-redacted:hover .about-redacted-mask,
.about-redacted:focus-visible .about-redacted-mask{
  opacity:0;
  filter:blur(8px);
}
.about-redacted:hover .about-redacted-code,
.about-redacted:focus-visible .about-redacted-code{
  opacity:1;
}
.about-ring{
  display:flex; flex-wrap:wrap; justify-content:center; gap:6px 10px;
  margin:0 0 12px;
}
.about-ring span{
  font-family:var(--font-mono); font-size:9px; letter-spacing:0.1em;
  text-transform:uppercase; color:var(--obs-ink);
}
.about-ring span::before{
  content:""; display:inline-block;
  width:6px; height:6px; border-radius:50%;
  background:#000; border:1px solid #555;
  margin-right:6px; vertical-align:middle;
  box-shadow:0 0 0 3px rgba(255,19,55,0.08);
}
.about-examples{
  display:flex; flex-wrap:wrap; justify-content:center; gap:6px;
  margin:0 0 14px; max-width:100%;
}
.about-ex{
  font-family:var(--font-mono); font-size:9px; letter-spacing:0.05em;
  color:var(--obs-ink);
  border:1px solid var(--line);
  background:rgba(0,0,0,0.28);
  padding:4px 8px; border-radius:999px;
}
.about-circle.is-classified .about-ex{
  color:var(--obs-muted); border-style:dashed;
}
.about-soft-link{
  font-family:var(--font-mono); font-size:11px; letter-spacing:0.06em;
  color:var(--accent); text-decoration:none;
  border-bottom:1px solid transparent;
  transition:border-color 0.2s;
}
.about-soft-link:hover{ border-bottom-color:var(--accent); }

.about-orbit-controls{
  display:flex; align-items:center; justify-content:center;
  gap:18px; margin-top:28px;
}
.about-orbit-btn{
  width:42px; height:42px; border-radius:50%;
  border:1px solid var(--line);
  background:rgba(20,16,18,0.8);
  color:var(--ink); cursor:pointer;
  font-family:var(--font-mono); font-size:16px; line-height:1;
  display:inline-flex; align-items:center; justify-content:center;
  transition:border-color 0.2s, color 0.2s, background 0.2s;
}
.about-orbit-btn:hover{
  border-color:var(--accent); color:var(--accent);
}
.about-orbit-dots{
  display:flex; gap:10px; align-items:center;
}
.about-orbit-dot{
  width:9px; height:9px; border-radius:50%;
  border:1px solid var(--line);
  background:transparent; padding:0; cursor:pointer;
  transition:background 0.2s, border-color 0.2s, transform 0.2s;
}
.about-orbit-dot.is-on{
  background:var(--accent); border-color:var(--accent);
  transform:scale(1.15);
}
.about-orbit-label{
  text-align:center; margin-top:14px;
  font-family:var(--font-mono); font-size:11px; letter-spacing:0.14em;
  text-transform:uppercase; color:var(--muted);
}
.about-orbit-label strong{ color:var(--ink); font-weight:500; }

.about-cta{
  position:relative;
  overflow:hidden;
  border:1px solid transparent;
  background:
    linear-gradient(165deg, rgba(28,22,18,0.96), rgba(12,10,12,0.98)) padding-box,
    linear-gradient(145deg, #f5e6a8 0%, #c9a227 22%, #ffe9a0 42%, #8a6a1a 58%, #e8c547 78%, #b8860b 100%) border-box;
  border-radius:4px;
  padding:48px 36px 42px;
  text-align:center;
  box-shadow:
    0 0 0 1px rgba(201,162,39,0.25),
    0 0 48px rgba(201,162,39,0.12),
    inset 0 1px 0 rgba(255,233,160,0.18);
}
.about-cta-stars{
  position:absolute; inset:0;
  pointer-events:none; overflow:hidden;
  z-index:0;
}
.about-cta-star{
  position:absolute;
  bottom:-12px;
  width:3px; height:3px;
  background:#ffe9a0;
  border-radius:50%;
  box-shadow:0 0 6px 1px rgba(255,233,160,0.7);
  opacity:0;
  animation:about-star-rise linear infinite;
}
.about-cta-star:nth-child(odd){
  width:2px; height:2px;
  background:#fff8dc;
}
.about-cta-star:nth-child(3n){
  width:4px; height:4px;
  box-shadow:0 0 10px 2px rgba(232,197,71,0.85);
}
.about-cta-star:nth-child(1){ left:6%;  animation-duration:7.2s; animation-delay:0s; }
.about-cta-star:nth-child(2){ left:14%; animation-duration:5.8s; animation-delay:1.1s; }
.about-cta-star:nth-child(3){ left:22%; animation-duration:8.4s; animation-delay:0.4s; }
.about-cta-star:nth-child(4){ left:31%; animation-duration:6.5s; animation-delay:2.2s; }
.about-cta-star:nth-child(5){ left:39%; animation-duration:9.1s; animation-delay:0.8s; }
.about-cta-star:nth-child(6){ left:48%; animation-duration:5.4s; animation-delay:1.7s; }
.about-cta-star:nth-child(7){ left:56%; animation-duration:7.8s; animation-delay:0.2s; }
.about-cta-star:nth-child(8){ left:64%; animation-duration:6.2s; animation-delay:2.8s; }
.about-cta-star:nth-child(9){ left:72%; animation-duration:8.7s; animation-delay:1.4s; }
.about-cta-star:nth-child(10){ left:79%; animation-duration:5.9s; animation-delay:0.6s; }
.about-cta-star:nth-child(11){ left:87%; animation-duration:7.5s; animation-delay:2.0s; }
.about-cta-star:nth-child(12){ left:94%; animation-duration:6.8s; animation-delay:3.1s; }
.about-cta-star:nth-child(13){ left:10%; animation-duration:9.4s; animation-delay:3.6s; }
.about-cta-star:nth-child(14){ left:43%; animation-duration:4.9s; animation-delay:2.5s; }
.about-cta-star:nth-child(15){ left:68%; animation-duration:8.1s; animation-delay:4.0s; }
.about-cta-star:nth-child(16){ left:84%; animation-duration:6.0s; animation-delay:3.4s; }
@keyframes about-star-rise{
  0%{
    transform:translateY(0) scale(0.6);
    opacity:0;
  }
  12%{ opacity:1; }
  70%{ opacity:0.85; }
  100%{
    transform:translateY(calc(-100% - 420px)) scale(1.15);
    opacity:0;
  }
}
.about-cta-inner{
  position:relative; z-index:1;
}
.about-cta-kicker{
  font-family:var(--font-mono); font-size:11px; letter-spacing:0.22em;
  text-transform:uppercase; color:#e8c547;
  margin:0 0 16px;
  text-shadow:0 0 18px rgba(232,197,71,0.35);
}
.about-cta-title{
  font-family:var(--font-display); font-weight:800;
  font-size:clamp(28px, 4.8vw, 44px);
  letter-spacing:-0.02em; line-height:1.05;
  color:#fff8dc;
  margin:0 0 14px;
  text-shadow:
    0 0 24px rgba(232,197,71,0.35),
    0 2px 0 rgba(0,0,0,0.45);
}
.about-cta-title em{
  font-style:normal;
  background:linear-gradient(120deg, #f5e6a8, #fff, #c9a227, #ffe9a0);
  background-size:200% auto;
  -webkit-background-clip:text;
  background-clip:text;
  color:transparent;
  animation:about-gold-shine 4.5s ease-in-out infinite;
}
@keyframes about-gold-shine{
  0%, 100%{ background-position:0% 50%; }
  50%{ background-position:100% 50%; }
}
.about-cta p{
  color:rgba(245,230,168,0.72); font-size:15px; line-height:1.55;
  max-width:420px; margin:0 auto 26px;
}
.about-cta-row{
  display:flex; flex-wrap:wrap; gap:12px; justify-content:center;
}
.about-btn{
  font-family:var(--font-mono); font-size:12px; letter-spacing:0.1em;
  text-transform:uppercase; text-decoration:none;
  padding:12px 22px; border-radius:3px;
  transition:background 0.2s, color 0.2s, border-color 0.2s, opacity 0.2s, box-shadow 0.2s;
}
.about-btn.primary{
  background:linear-gradient(180deg, #e8c547, #c9a227);
  color:#1a1408; border:1px solid #f5e6a8;
  font-weight:700;
  box-shadow:0 0 20px rgba(201,162,39,0.35);
}
.about-btn.primary:hover{ opacity:0.92; box-shadow:0 0 28px rgba(232,197,71,0.5); }
.about-btn.ghost{
  background:rgba(0,0,0,0.35); color:#f5e6a8;
  border:1px solid rgba(201,162,39,0.55);
}
.about-btn.ghost:hover{
  border-color:#ffe9a0; color:#fff8dc;
  box-shadow:0 0 16px rgba(201,162,39,0.25);
}

footer{
  padding:56px 0 64px; text-align:center; border-top:1px solid var(--line);
  position:relative; z-index:1;
}
footer p{ margin:0; }
footer a{
  font-family:var(--font-display); font-weight:800;
  font-size:18px; letter-spacing:0.08em;
  color:var(--accent); text-decoration:none;
  transition:opacity 0.2s;
}
footer a:hover{ opacity:0.8; }

@media (max-width:820px){
  .mock{ grid-template-columns:1fr; height:var(--mock-view-h); }
  .mock-tree, .mock-side{ display:none; }
  .mock-main{ height:100%; }
  .ed-body{ grid-template-columns:1fr; height:calc(var(--mock-view-h) - 49px); }
  .ed-timeline{ border-right:none; border-bottom:1px solid var(--obs-line); max-height:180px; }
  .nn-body{ grid-template-columns:1fr; height:var(--mock-view-h); }
  .nn-vis{ border-right:none; border-bottom:1px solid var(--obs-line); height:55%; }
  .nn-train{ min-height:0; overflow:auto; }
  .yc-steps{ grid-template-columns:1fr 1fr; }
  .about-circle{ padding:12% 14%; }
  .about-circle-pitch{ display:-webkit-box; -webkit-line-clamp:4; -webkit-box-orient:vertical; overflow:hidden; }
}

@media (prefers-reduced-motion: reduce){
  .term-cursor{ animation:none; opacity:1; }
  .cb-layer{ transition:none; }
  .sf-tile:not(.is-empty){ --sf-t: 1; }
  .sf-tile:not(.is-empty) .sf-layer,
  .sf-tile:not(.is-empty) .sf-badge .sf-badge-before,
  .sf-tile:not(.is-empty) .sf-badge .sf-badge-after{ transition:none; }
  .sf-tile:not(.is-empty):hover,
  .sf-tile:not(.is-empty):focus-within{ --sf-t: 0; }
  .about-manifesto{
    transition:none !important;
    opacity:1 !important;
    transform:none !important;
  }
  .about-orbit-track{ transition:none !important; }
  .about-cta-star,
  .about-cta-title em{
    animation:none !important;
  }
  .about-cta-star{ opacity:0.55; transform:translateY(-40%); }
  .about-cta-title em{
    color:#e8c547;
    background:none;
    -webkit-background-clip:unset;
    background-clip:unset;
  }
}
</style>
</head>
<body>

<nav>
  <div class="nav-inner">
    <div class="nav-brand">CORVIDAE</div>
    <div class="nav-links">
      <a href="#dashboard">Dashboard</a>
      <a href="#codeblock">Codeblock</a>
      <a href="#graph">Graph</a>
      <a href="#features">Features</a>
      <a href="#db-graph">Custom Graph</a>
      <a href="#editor">Editor</a>
      <a href="#neural">Neural</a>
      <a href="#your-code">Your code</a>
      <a href="#about">About</a>
    </div>
  </div>
</nav>

<header class="hero">
  <div class="hero-emoji" aria-hidden="true"><svg class="corvidae-crow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 3c-1.2 1.8-1.6 3.4-1.5 5.1-.9-.4-1.7-.5-2.6-.3-1.4.3-2.5 1.3-3.1 2.6-.4.8-.5 1.7-.3 2.6.3 1.3 1.2 2.4 2.5 2.9-.7.9-1 2-1 3.2 0 .4.3.7.7.7h.1c.3 0 .6-.2.7-.5.3-1 .8-1.8 1.6-2.4.5 1.4 1.5 2.5 2.9 3.1.3.1.7 0 .8-.3.1-.3 0-.7-.3-.8-1.1-.5-1.9-1.4-2.2-2.6 1.1.2 2.2 0 3.1-.6.9-.6 1.5-1.5 1.7-2.6.6.5 1.4.8 2.2.8.4 0 .7-.3.7-.7 0-.9-.3-1.7-.8-2.4.9-.3 1.6-1 2-1.9.2-.4 0-.9-.4-1.1-.4-.2-.9 0-1.1.4-.3.6-.8 1.1-1.5 1.3-.1-1.2-.6-2.3-1.5-3.1C13.6 4.6 12.9 3.7 12 3z"/></svg></div>
  <div class="eyebrow">Obsidian Plugin \xB7 <span>ein.ink</span> \xB7 v2.0.6</div>
  <h1 class="title">CORVIDAE<br><em>Workspace</em></h1>
  <p class="tagline">A vault operating system: dashboard, tickets, Custom Graph, vault-bar controls, folder notes, and HTML pages \u2014 inside Obsidian.</p>
</header>

<div class="wrap">

  <section id="dashboard">
    <div class="section-head">
      <span class="section-num">01 \u2014 Dashboard</span>
      <h2>One grid for everything open</h2>
      <p class="section-sub">Modular layout with boxes: Graph, notes, browser (Web Viewer), terminal, and ticket log \u2014 one workspace. Hover a pane for details.</p>
    </div>

    <div class="mock" aria-label="Dashboard workspace mock">
      <aside class="mock-tree hotspot" id="mock-tree" tabindex="0" aria-label="File Explorer">
        <div class="tree-tools">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7.5A1.5 1.5 0 0 1 4.5 6H9l2 2h8.5A1.5 1.5 0 0 1 21 9.5v8A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-10z"/></svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 4h10a1 1 0 0 1 1 1v15l-6-3.5L6 20V5a1 1 0 0 1 1-1z"/></svg>
        </div>
        <div class="tree-list">
          <div class="tree-row"><span class="name"><span class="tree-dot" aria-hidden="true"></span>CORVIDAE</span><span class="tag">HYBRID</span></div>
          <div class="tree-children">
            <div class="tree-row child"><span class="name">EXCALIDRAW</span><span class="tag">DRAW</span></div>
            <div class="tree-row child"><span class="name">TABLE</span><span class="tag">BASE</span></div>
            <div class="tree-row child"><span class="name"><span class="tree-dot" aria-hidden="true"></span>NOTES</span><span class="tag">FOLDER</span></div>
            <div class="tree-children">
              <div class="tree-row child"><span class="name">INTRO</span><span class="tag">NOTE</span></div>
            </div>
          </div>
          <div class="tree-row"><span class="name"><span class="tree-dot" aria-hidden="true"></span>ORGANIZATION</span><span class="tag">HYBRID</span></div>
          <div class="tree-row"><span class="name"><span class="tree-dot" aria-hidden="true"></span>ROUTINES</span><span class="tag">HYBRID</span></div>
          <div class="tree-row"><span class="name"><span class="tree-dot" aria-hidden="true"></span>VISIBILITY</span><span class="tag">HYBRID</span></div>
          <div class="tree-row"><span class="name"><span class="tree-dot" aria-hidden="true"></span>IMPULSES</span><span class="tag">HYBRID</span></div>
          <div class="tree-row"><span class="name"><span class="tree-dot" aria-hidden="true"></span>DOCUMENTATION</span><span class="tag">HYBRID</span></div>
          <div class="tree-row"><span class="name"><span class="tree-dot" aria-hidden="true"></span>ARCHIVED</span><span class="tag">HYBRID</span></div>
          <div class="tree-row"><span class="name"><span class="tree-dot" aria-hidden="true"></span>ENCYCLOPEDIA</span><span class="tag">HYBRID</span></div>
        </div>
        <div class="tree-foot">
          <span>VAULT</span>
          <span class="icons" aria-hidden="true">
            <!-- Lucide: circle-help -->
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
            <!-- Lucide: settings -->
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
            <!-- Lucide: git-fork (Obsidian Graph) -->
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><path d="M12 12v3"/></svg>
            <!-- Lucide: bird (Corvidae Crow) -->
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 7h.01"/><path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"/><path d="m20 7 2 .5-2 .5"/><path d="M10 18v3"/><path d="M14 17.75V21"/><path d="M7 18a6 6 0 0 0 3.84-10.61"/></svg>
          </span>
        </div>
      </aside>

      <div class="ctx-menu" id="ctx-menu" aria-hidden="true">
        <div class="ctx-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><path d="M9 13h6M9 17h4"/></svg>
          New note <span class="hint">(Obsidian)</span>
        </div>
        <div class="ctx-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7.5A1.5 1.5 0 0 1 4.5 6H9l2 2h8.5A1.5 1.5 0 0 1 21 9.5v8A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-10z"/></svg>
          New folder
        </div>
        <div class="ctx-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          New canvas
        </div>
        <div class="ctx-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h16M4 18h10"/><circle cx="7" cy="6" r="1.2" fill="currentColor"/><circle cx="7" cy="12" r="1.2" fill="currentColor"/><circle cx="7" cy="18" r="1.2" fill="currentColor"/></svg>
          New base
        </div>
        <div class="ctx-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5A1.5 1.5 0 0 1 4.5 7H9l1.5 1.5H14"/><path d="M8 12.5A1.5 1.5 0 0 1 9.5 11H14l2 2h3.5A1.5 1.5 0 0 1 21 14.5v4A1.5 1.5 0 0 1 19.5 20h-10A1.5 1.5 0 0 1 8 18.5v-6z"/></svg>
          New folder note <span class="hint corvidae">(Corvidae)</span>
        </div>
        <div class="ctx-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 2 2-7 7-3 1z"/><path d="M18 13l-2-2"/><path d="M4 20l2-6 8-8 4 4-8 8z"/></svg>
          New drawing <span class="hint">(Excalidraw)</span>
        </div>
      </div>

      <div class="mock-main">
        <div class="mock-titlebar">
          <h3>CORVIDAE</h3>
          <span class="crow" aria-hidden="true"><svg class="corvidae-crow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 3c-1.2 1.8-1.6 3.4-1.5 5.1-.9-.4-1.7-.5-2.6-.3-1.4.3-2.5 1.3-3.1 2.6-.4.8-.5 1.7-.3 2.6.3 1.3 1.2 2.4 2.5 2.9-.7.9-1 2-1 3.2 0 .4.3.7.7.7h.1c.3 0 .6-.2.7-.5.3-1 .8-1.8 1.6-2.4.5 1.4 1.5 2.5 2.9 3.1.3.1.7 0 .8-.3.1-.3 0-.7-.3-.8-1.1-.5-1.9-1.4-2.2-2.6 1.1.2 2.2 0 3.1-.6.9-.6 1.5-1.5 1.7-2.6.6.5 1.4.8 2.2.8.4 0 .7-.3.7-.7 0-.9-.3-1.7-.8-2.4.9-.3 1.6-1 2-1.9.2-.4 0-.9-.4-1.1-.4-.2-.9 0-1.1.4-.3.6-.8 1.1-1.5 1.3-.1-1.2-.6-2.3-1.5-3.1C13.6 4.6 12.9 3.7 12 3z"/></svg></span>
        </div>

        <div class="mock-grid">
          <article class="pane hotspot" id="mock-graph" tabindex="0" aria-label="Graph View">
            <div class="pane-head">Graph View</div>
            <div class="pane-body">
              <svg class="graph-canvas" viewBox="0 0 220 140" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <line x1="20" y1="70" x2="55" y2="40"/><line x1="55" y1="40" x2="95" y2="55"/>
                <line x1="95" y1="55" x2="140" y2="30"/><line x1="140" y1="30" x2="180" y2="45"/>
                <line x1="55" y1="40" x2="70" y2="85"/><line x1="70" y1="85" x2="110" y2="100"/>
                <line x1="95" y1="55" x2="110" y2="100"/><line x1="110" y1="100" x2="155" y2="110"/>
                <line x1="20" y1="70" x2="40" y2="110"/><line x1="40" y1="110" x2="70" y2="85"/>
                <line x1="180" y1="45" x2="200" y2="75"/><line x1="155" y1="110" x2="195" y2="95"/>
                <line x1="95" y1="55" x2="130" y2="75"/><line x1="130" y1="75" x2="155" y2="110"/>
                <line x1="40" y1="25" x2="55" y2="40"/><line x1="100" y1="15" x2="95" y2="55"/>
                <line x1="160" y1="70" x2="180" y2="45"/><line x1="75" y1="120" x2="110" y2="100"/>
                <circle cx="20" cy="70" r="2.5"/><circle class="hot" cx="55" cy="40" r="4"/>
                <circle cx="95" cy="55" r="3"/><circle class="warn" cx="140" cy="30" r="3.5"/>
                <circle cx="180" cy="45" r="2.5"/><circle class="hot" cx="70" cy="85" r="3.5"/>
                <circle cx="110" cy="100" r="3"/><circle cx="155" cy="110" r="2.5"/>
                <circle cx="40" cy="110" r="2"/><circle cx="200" cy="75" r="2.5"/>
                <circle class="warn" cx="195" cy="95" r="3"/><circle cx="130" cy="75" r="2.5"/>
                <circle cx="40" cy="25" r="2"/><circle cx="100" cy="15" r="2"/>
                <circle cx="160" cy="70" r="2"/><circle cx="75" cy="120" r="2"/>
                <circle cx="25" cy="35" r="1.5"/><circle cx="210" cy="50" r="1.5"/>
              </svg>
            </div>
          </article>

          <article class="pane hotspot" id="mock-website" tabindex="0" aria-label="Website">
            <div class="pane-head">Website</div>
            <div class="pane-body">
              <div class="web-canvas">
                <span class="web-label left">EIN.INK</span>
                <span class="web-label right">PATREON</span>
                <div class="web-cube"></div>
                <div class="web-sliders" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
              </div>
            </div>
          </article>

          <article class="pane hotspot" id="mock-tickets" tabindex="0" aria-label="Tickets">
            <div class="pane-head">Tickets</div>
            <div class="pane-body">
              <div class="ticket-scroll">
                <div class="ticket-card">
                  <div class="ticket-card-head">TICKET 23 \u2014 Single-File HTML (2026-09-08)</div>
                  <div class="ticket-card-body">
                    <p><strong>Request</strong> \u2014 PDF of the future as one HTML file</p>
                    <p><strong>Status</strong> \u2014 ticket created, still open</p>
                    <p><strong>Related</strong> <span class="path">TICKET 22 \xB7 TICKET 19</span></p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article class="pane hotspot" id="mock-console" tabindex="0" aria-label="Console">
            <div class="pane-head">Console</div>
            <div class="pane-body">
              <div class="term-body">
                <span class="prompt">$</span><span class="term-cursor" aria-hidden="true"></span>
              </div>
            </div>
          </article>
        </div>
      </div>

      <aside class="mock-side hotspot" id="mock-side" tabindex="0" aria-label="Properties and Tickets">
        <div class="side-props">No properties found.</div>
        <div class="side-create">
          <div class="side-block">
            <h4>CORVIDAE PLUGIN</h4>
            <div class="side-input">Ticket content...</div>
            <button type="button" class="side-btn" tabindex="-1">Create</button>
          </div>
        </div>
      </aside>

      <div class="mock-tooltip" id="tree-tooltip" role="tooltip" aria-hidden="true">
        <div class="tt-title">File Explorer</div>
        <p class="tt-block">
          <span class="tt-label">Hybrid</span>
          Folder + Note as one unit \u2014 a hybrid folder/note combination.
        </p>
        <div class="tt-block">
          <span class="tt-label">Tags</span>
          <div class="tt-tags">
            <span>HYBRID</span> folder note<br>
            <span>FOLDER</span> folder only<br>
            <span>NOTE</span> markdown<br>
            <span>DRAW</span> Excalidraw<br>
            <span>BASE</span> base
          </div>
        </div>
        <p class="tt-block tt-tip">
          <strong>Tip:</strong> Right-click to create note, folder, canvas, base, folder note (Corvidae), or drawing (Excalidraw). Bottom bar: <strong>Graph</strong> + <strong>Crow</strong> replace the left ribbon.
        </p>
      </div>

      <div class="mock-tooltip" id="graph-tooltip" role="tooltip" aria-hidden="true">
        <div class="tt-title">Graph View</div>
        <p class="tt-block">
          <span class="tt-label">Embedded</span>
          Obsidian Graph View inside the dashboard grid.
        </p>
        <div class="tt-block">
          <span class="tt-label">Frontmatter</span>
          <div class="tt-tags">
            <span>size</span> node size<br>
            <span>color</span> node color
          </div>
        </div>
        <p class="tt-block tt-tip">
          <strong>Tip:</strong> The legend filters by color and opens notes in a second tab.
        </p>
      </div>

      <div class="mock-tooltip" id="website-tooltip" role="tooltip" aria-hidden="true">
        <div class="tt-title">Website</div>
        <p class="tt-block">
          <span class="tt-label">Web Viewer</span>
          Obsidian Core Web Viewer inside the dashboard grid.
        </p>
        <div class="tt-block">
          <span class="tt-label">Drop any URL</span>
          Sites, docs, Patreon, local previews \u2014 research stays next to graph and tickets.
        </div>
        <p class="tt-block tt-tip">
          <strong>Tip:</strong> Keep browsing in the workspace without leaving CORVIDAE.
        </p>
      </div>

      <div class="mock-tooltip" id="tickets-tooltip" role="tooltip" aria-hidden="true">
        <div class="tt-title">Tickets</div>
        <p class="tt-block">
          <span class="tt-label">Queue</span>
          Reads ticket callouts from the project development log.
        </p>
        <div class="tt-block">
          <span class="tt-label">Visible</span>
          Latest open ticket or the full queue \u2014 work status stays next to graph and console.
        </div>
        <p class="tt-block tt-tip">
          <strong>Tip:</strong> Create tickets from the right sidebar; they land in the log and show up here.
        </p>
      </div>

      <div class="mock-tooltip" id="console-tooltip" role="tooltip" aria-hidden="true">
        <div class="tt-title">Console</div>
        <p class="tt-block">
          <span class="tt-label">Terminal leaf</span>
          A ready prompt in the dashboard grid \u2014 run project commands without leaving the workspace.
        </p>
        <div class="tt-block">
          <span class="tt-label">Other plugins</span>
          Needs a terminal plugin from another maker. CORVIDAE also helps third-party plugins improve your dashboard.
        </div>
        <p class="tt-block tt-tip">
          <strong>Tip:</strong> Drop compatible plugin views into the grid to extend CORVIDAE.
        </p>
      </div>

      <div class="mock-tooltip" id="side-tooltip" role="tooltip" aria-hidden="true">
        <div class="tt-title">Properties &amp; Tickets</div>
        <p class="tt-block">
          <span class="tt-label">Properties</span>
          Note properties on top \u2014 empty when nothing is selected.
        </p>
        <div class="tt-block">
          <span class="tt-label">Ticket system</span>
          Create projects in CORVIDAE settings first \u2014 without projects, tickets cannot be used.
        </div>
        <p class="tt-block tt-tip">
          <strong>Tip:</strong> Once projects exist, create numbered tickets here; they land in the development log and show up in the Tickets box.
        </p>
      </div>
    </div>
  </section>

  <section id="codeblock">
    <div class="section-head">
      <span class="section-num">02 \u2014 Codeblock</span>
      <h2>HTML one pager inside a Markdown</h2>
      <p class="section-sub">Fence <code style="font-family:var(--font-mono);color:var(--accent);">corvidaehtml</code> turns a code block into a sandboxed page in Reading View and Live Preview. Slide to compare source and render.</p>
    </div>

    <div class="cb-mock" id="cb-mock" aria-label="corvidaehtml codeblock mock" style="--cb-t:0">
      <div class="cb-chrome">
        <span class="lang">&#96;&#96;&#96;corvidaehtml</span>
      </div>
      <div class="cb-stage">
        <pre class="cb-layer cb-code" id="cb-code"></pre>
        <div class="cb-layer cb-html" id="cb-html">
          <iframe id="cb-frame" title="CROW HERO preview" sandbox="allow-scripts"></iframe>
        </div>
      </div>
      <div class="cb-slider">
        <span class="lbl is-on" id="cb-lbl-code">Code</span>
        <input type="range" id="cb-range" min="0" max="100" value="0" aria-label="Slide between Code and HTML">
        <span class="lbl" id="cb-lbl-html">HTML</span>
      </div>
    </div>
  </section>

  <section id="graph">
    <div class="section-head">
      <span class="section-num">03 \u2014 Graph</span>
      <h2>Size and color from frontmatter</h2>
      <p class="section-sub">Hybrid folders render as large black nodes (size 50). Notes and folder content stay small and grey (#888888, size 1).</p>
    </div>

    <div class="gv-mock" aria-label="Graph View mock">
      <div class="gv-chrome">
        <span class="lang">Graph View</span>
        <span class="hint">drag nodes \xB7 physics</span>
      </div>
      <div class="gv-stage" id="gv-stage">
        <svg class="gv-canvas" id="gv-canvas" viewBox="0 0 900 560" preserveAspectRatio="xMidYMid meet">
          <g id="gv-world">
            <g id="gv-edges">
              <line data-from="corvidae" data-to="excalidraw"/>
              <line data-from="corvidae" data-to="table"/>
              <line data-from="corvidae" data-to="notes"/>
              <line data-from="notes" data-to="intro"/>
            </g>
            <g id="gv-nodes">
              <g class="gv-node" data-id="organization" data-x="180" data-y="110" data-r="12" data-kind="main">
                <circle class="gv-hit" r="16"/>
                <circle class="node-main" r="12"/>
                <text class="lbl-main" text-anchor="middle" y="18">ORGANIZATION</text>
              </g>
              <g class="gv-node" data-id="routines" data-x="720" data-y="90" data-r="12" data-kind="main">
                <circle class="gv-hit" r="16"/>
                <circle class="node-main" r="12"/>
                <text class="lbl-main" text-anchor="middle" y="18">ROUTINES</text>
              </g>
              <g class="gv-node" data-id="visibility" data-x="100" data-y="300" data-r="12" data-kind="main">
                <circle class="gv-hit" r="16"/>
                <circle class="node-main" r="12"/>
                <text class="lbl-main" text-anchor="middle" y="18">VISIBILITY</text>
              </g>
              <g class="gv-node" data-id="impulses" data-x="800" data-y="280" data-r="12" data-kind="main">
                <circle class="gv-hit" r="16"/>
                <circle class="node-main" r="12"/>
                <text class="lbl-main" text-anchor="middle" y="18">IMPULSES</text>
              </g>
              <g class="gv-node" data-id="documentation" data-x="200" data-y="470" data-r="12" data-kind="main">
                <circle class="gv-hit" r="16"/>
                <circle class="node-main" r="12"/>
                <text class="lbl-main" text-anchor="middle" y="18">DOCUMENTATION</text>
              </g>
              <g class="gv-node" data-id="archived" data-x="520" data-y="490" data-r="12" data-kind="main">
                <circle class="gv-hit" r="16"/>
                <circle class="node-main" r="12"/>
                <text class="lbl-main" text-anchor="middle" y="18">ARCHIVED</text>
              </g>
              <g class="gv-node" data-id="encyclopedia" data-x="760" data-y="450" data-r="12" data-kind="main">
                <circle class="gv-hit" r="16"/>
                <circle class="node-main" r="12"/>
                <text class="lbl-main" text-anchor="middle" y="18">ENCYCLOPEDIA</text>
              </g>
              <g class="gv-node" data-id="corvidae" data-x="450" data-y="270" data-r="12" data-kind="main">
                <circle class="gv-hit" r="16"/>
                <circle class="node-main" r="12"/>
                <text class="lbl-main" text-anchor="middle" y="18">CORVIDAE</text>
              </g>
              <g class="gv-node" data-id="excalidraw" data-x="360" data-y="210" data-r="2.4" data-kind="note" data-label="left">
                <circle class="gv-hit" r="10"/>
                <circle class="node-note" r="2.4"/>
                <text class="lbl-side" text-anchor="end" x="-8">EXCALIDRAW</text>
              </g>
              <g class="gv-node" data-id="table" data-x="360" data-y="330" data-r="2.4" data-kind="note" data-label="left">
                <circle class="gv-hit" r="10"/>
                <circle class="node-note" r="2.4"/>
                <text class="lbl-side" text-anchor="end" x="-8">TABLE</text>
              </g>
              <g class="gv-node" data-id="notes" data-x="540" data-y="210" data-r="2.4" data-kind="note" data-label="right">
                <circle class="gv-hit" r="10"/>
                <circle class="node-note" r="2.4"/>
                <text class="lbl-side" text-anchor="start" x="8">NOTES</text>
              </g>
              <g class="gv-node" data-id="intro" data-x="610" data-y="170" data-r="2.4" data-kind="note" data-label="right">
                <circle class="gv-hit" r="10"/>
                <circle class="node-note" r="2.4"/>
                <text class="lbl-side" text-anchor="start" x="8">INTRO</text>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  </section>

  <section id="features">
    <div class="section-head">
      <span class="section-num">04 \u2014 Small Features</span>
      <h2>Small upgrades, big daily wins</h2>
      <p class="section-sub">Six quick demos \u2014 each shows the result; hover a tile to see before.</p>
    </div>

    <div class="sf-grid" aria-label="Small features mock grid">
      <article class="sf-tile" aria-label="Hide note title">
        <div class="sf-chrome">
          <span class="lang">Hide title</span>
          <span class="sf-badge" aria-hidden="true">
            <span class="sf-badge-before">Before</span>
            <span class="sf-badge-after">After</span>
          </span>
        </div>
        <div class="sf-stage">
          <div class="sf-layer sf-before">
            <div class="sf-note-bar">Folder/Note.md</div>
            <h3 class="sf-note-title">Note</h3>
            <p class="sf-note-body">Same name again in the body \u2014 redundant with the tab above.</p>
          </div>
          <div class="sf-layer sf-after">
            <div class="sf-note-bar">Folder/Note.md</div>
            <p class="sf-note-body">Inline title gone. The tab already says it \u2014 content starts here.</p>
          </div>
        </div>
      </article>

      <article class="sf-tile" aria-label="Embed links decouple graph">
        <div class="sf-chrome">
          <span class="lang">Embed \u2260 link</span>
          <span class="sf-badge" aria-hidden="true">
            <span class="sf-badge-before">Before</span>
            <span class="sf-badge-after">After</span>
          </span>
        </div>
        <div class="sf-stage">
          <div class="sf-layer sf-before">
            <p class="sf-code-line"><em>![[</em>board.canvas<em>]]</em> still draws an edge</p>
            <div class="sf-graph-pane">
              <span class="sf-graph-cap">Graph View</span>
              <svg class="sf-mini-graph" viewBox="0 0 260 110" aria-hidden="true">
                <line class="sf-edge" x1="78" y1="52" x2="180" y2="52"/>
                <circle class="sf-node-dot" cx="78" cy="52" r="5"/>
                <text class="sf-node-lbl" x="78" y="68">NOTE</text>
                <circle class="sf-node-main" cx="180" cy="52" r="11"/>
                <text class="sf-node-lbl" x="180" y="75">BOARD.CANVAS</text>
              </svg>
            </div>
          </div>
          <div class="sf-layer sf-after">
            <p class="sf-code-line"><em>![[</em>board.canvas<em>]]</em> embed only \u2014 no edge</p>
            <div class="sf-graph-pane">
              <span class="sf-graph-cap">Graph View</span>
              <svg class="sf-mini-graph" viewBox="0 0 260 110" aria-hidden="true">
                <circle class="sf-node-dot" cx="62" cy="78" r="5"/>
                <text class="sf-node-lbl" x="62" y="94">NOTE</text>
                <circle class="sf-node-main" cx="188" cy="36" r="11"/>
                <text class="sf-node-lbl" x="188" y="59">BOARD.CANVAS</text>
              </svg>
            </div>
          </div>
        </div>
        <p class="sf-footer">Edges only from <em>link:</em> in frontmatter</p>
      </article>

      <article class="sf-tile" aria-label="Table SUMME formula">
        <div class="sf-chrome">
          <span class="lang">=SUMME</span>
          <span class="sf-badge" aria-hidden="true">
            <span class="sf-badge-before">Before</span>
            <span class="sf-badge-after">After</span>
          </span>
        </div>
        <div class="sf-stage">
          <div class="sf-layer sf-before">
            <table class="sf-table">
              <thead><tr><th>Item</th><th>Amt</th></tr></thead>
              <tbody>
                <tr><td>Alpha</td><td>10</td></tr>
                <tr><td>Beta</td><td>25</td></tr>
                <tr><td>Total</td><td class="sf-sum-raw">=SUMME</td></tr>
              </tbody>
            </table>
          </div>
          <div class="sf-layer sf-after">
            <table class="sf-table">
              <thead><tr><th>Item</th><th>Amt</th></tr></thead>
              <tbody>
                <tr><td>Alpha</td><td>10</td></tr>
                <tr><td>Beta</td><td>25</td></tr>
                <tr><td>Total</td><td class="sf-sum-val">35</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <p class="sf-footer">Reading view computes it</p>
      </article>

      <article class="sf-tile" aria-label="Development folders">
        <div class="sf-chrome">
          <span class="lang">DEV folder</span>
          <span class="sf-badge" aria-hidden="true">
            <span class="sf-badge-before">Before</span>
            <span class="sf-badge-after">After</span>
          </span>
        </div>
        <div class="sf-stage">
          <div class="sf-layer sf-before">
            <p class="sf-code-line">Settings \u203A Development folders: <em>\u2014</em></p>
            <div class="sf-dev-cols">
              <div class="sf-dev-tree">
                <div class="sf-dev-row"><span class="sf-dev-name"><span class="sf-dev-caret">\u25BE</span>DEVELOPMENT</span><span class="sf-dev-tag">folder</span></div>
                <div class="sf-dev-kids">
                  <div class="sf-dev-row"><span class="sf-dev-name"><span class="sf-dev-caret">\u25BE</span>corvidae-v2</span><span class="sf-dev-tag">folder</span></div>
                  <div class="sf-dev-kids">
                    <div class="sf-dev-row"><span class="sf-dev-name"><span class="sf-dev-caret">\u25BE</span>src</span></div>
                    <div class="sf-dev-kids">
                      <div class="sf-dev-row"><span class="sf-dev-name">main.ts</span></div>
                      <div class="sf-dev-row"><span class="sf-dev-name">graph.ts</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="sf-graph-pane">
                <span class="sf-graph-cap">Graph</span>
                <svg class="sf-mini-graph" viewBox="0 0 140 118" aria-hidden="true">
                  <line class="sf-edge" x1="44" y1="40" x2="38" y2="74"/>
                  <line class="sf-edge" x1="44" y1="40" x2="86" y2="32"/>
                  <line class="sf-edge" x1="86" y1="32" x2="108" y2="50"/>
                  <line class="sf-edge" x1="86" y1="32" x2="92" y2="62"/>
                  <line class="sf-edge" x1="92" y1="62" x2="72" y2="84"/>
                  <line class="sf-edge" x1="92" y1="62" x2="110" y2="80"/>
                  <circle class="sf-node-dot" cx="86" cy="32" r="3.5"/>
                  <circle class="sf-node-dot" cx="108" cy="50" r="3.5"/>
                  <circle class="sf-node-dot" cx="92" cy="62" r="3.5"/>
                  <circle class="sf-node-dot" cx="72" cy="84" r="3.5"/>
                  <circle class="sf-node-dot" cx="110" cy="80" r="3.5"/>
                  <circle class="sf-node-dot" cx="38" cy="74" r="4"/>
                  <text class="sf-node-lbl" x="38" y="88">NOTES</text>
                  <circle class="sf-node-main" cx="44" cy="40" r="9"/>
                  <text class="sf-node-lbl" x="44" y="62">VAULT</text>
                </svg>
              </div>
            </div>
          </div>
          <div class="sf-layer sf-after">
            <p class="sf-code-line">Settings \u203A Development folders: <em>DEVELOPMENT</em></p>
            <div class="sf-dev-cols">
              <div class="sf-dev-tree">
                <div class="sf-dev-row"><span class="sf-dev-name"><span class="sf-dev-caret">\u25BE</span>DEVELOPMENT</span><span class="sf-dev-tag">folder</span></div>
                <div class="sf-dev-kids">
                  <div class="sf-dev-row is-sealed"><span class="sf-dev-name"><span class="sf-dev-caret is-locked">\u25A0</span>corvidae-v2</span><span class="sf-dev-tag">dev</span></div>
                  <div class="sf-dev-hidden">sealed \u2014 won't open</div>
                </div>
              </div>
              <div class="sf-graph-pane">
                <span class="sf-graph-cap">Graph</span>
                <svg class="sf-mini-graph" viewBox="0 0 140 118" aria-hidden="true">
                  <line class="sf-edge" x1="52" y1="44" x2="94" y2="76"/>
                  <circle class="sf-node-dot" cx="94" cy="76" r="4"/>
                  <text class="sf-node-lbl" x="94" y="90">NOTES</text>
                  <circle class="sf-node-main" cx="52" cy="44" r="9"/>
                  <text class="sf-node-lbl" x="52" y="66">VAULT</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <p class="sf-footer">Sealed in the explorer, <em>gone</em> from the graph</p>
      </article>

      <article class="sf-tile" aria-label="Vault bar graph and crow">
        <div class="sf-chrome">
          <span class="lang">Vault bar</span>
          <span class="sf-badge" aria-hidden="true">
            <span class="sf-badge-before">Before</span>
            <span class="sf-badge-after">After</span>
          </span>
        </div>
        <div class="sf-stage">
          <div class="sf-layer sf-before">
            <div class="sf-vault-scene">
              <p class="sf-code-line">Left ribbon for Graph + Dashboard</p>
              <div class="sf-vault-ribbon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><path d="M12 12v3"/></svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 7h.01"/><path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"/><path d="m20 7 2 .5-2 .5"/><path d="M10 18v3"/><path d="M14 17.75V21"/><path d="M7 18a6 6 0 0 0 3.84-10.61"/></svg>
              </div>
              <div class="sf-vault-bar">
                <span>VAULT</span>
                <span class="sf-vault-icons">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                </span>
              </div>
            </div>
          </div>
          <div class="sf-layer sf-after">
            <div class="sf-vault-scene">
              <p class="sf-code-line">Bottom bar = ribbon \u2014 <em>no left ribbon</em></p>
              <div class="sf-vault-ribbon is-gone" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><path d="M12 12v3"/></svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 7h.01"/><path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"/><path d="m20 7 2 .5-2 .5"/><path d="M10 18v3"/><path d="M14 17.75V21"/><path d="M7 18a6 6 0 0 0 3.84-10.61"/></svg>
              </div>
              <div class="sf-vault-bar">
                <span>VAULT</span>
                <span class="sf-vault-icons">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                  <svg class="is-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><path d="M12 12v3"/></svg>
                  <svg class="is-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 7h.01"/><path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"/><path d="m20 7 2 .5-2 .5"/><path d="M10 18v3"/><path d="M14 17.75V21"/><path d="M7 18a6 6 0 0 0 3.84-10.61"/></svg>
                </span>
              </div>
            </div>
          </div>
        </div>
        <p class="sf-footer"><em>Graph</em> + <em>Crow</em> sit bottom-left \u2014 the ribbon isn\u2019t needed</p>
      </article>

      <article class="sf-tile" aria-label="Frontmatter properties">
        <div class="sf-chrome">
          <span class="lang">Frontmatter</span>
          <span class="sf-badge" aria-hidden="true">
            <span class="sf-badge-before">Before</span>
            <span class="sf-badge-after">After</span>
          </span>
        </div>
        <div class="sf-stage">
          <div class="sf-layer sf-layer--props sf-before">
            <div class="sf-props" aria-hidden="true">
              <div class="sf-props-row">
                <span class="sf-props-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 17 20 12 15 7"/><path d="M4 18v-2a4 4 0 0 1 4-4h12"/></svg></span>
                <span class="sf-props-key">aliases</span>
                <span class="sf-props-val"><span class="sf-props-pill is-muted">Note</span></span>
              </div>
              <div class="sf-props-row">
                <span class="sf-props-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19"/><path d="M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="6.5" cy="9.5" r=".5" fill="currentColor"/></svg></span>
                <span class="sf-props-key">tags</span>
                <span class="sf-props-val"><span class="sf-props-pill">corvidae</span></span>
              </div>
            </div>
          </div>
          <div class="sf-layer sf-layer--props sf-after">
            <div class="sf-props">
              <div class="sf-props-row">
                <span class="sf-props-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 17 20 12 15 7"/><path d="M4 18v-2a4 4 0 0 1 4-4h12"/></svg></span>
                <span class="sf-props-key">aliases</span>
                <span class="sf-props-val"><span class="sf-props-pill is-muted">1</span></span>
              </div>
              <div class="sf-props-row">
                <span class="sf-props-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19"/><path d="M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="6.5" cy="9.5" r=".5" fill="currentColor"/></svg></span>
                <span class="sf-props-key">tags</span>
                <span class="sf-props-val"><span class="sf-props-pill">corvidae</span></span>
              </div>
              <div class="sf-props-row">
                <span class="sf-props-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></span>
                <span class="sf-props-key">link</span>
                <span class="sf-props-val is-stack">
                  <span class="sf-props-link">VERTRIEB</span>
                  <span class="sf-props-link">ENTWICKLUNG</span>
                </span>
              </div>
              <div class="sf-props-row">
                <span class="sf-props-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><path d="M12 12v3"/></svg></span>
                <span class="sf-props-key">size</span>
                <span class="sf-props-val"><span class="sf-props-num">50</span></span>
              </div>
              <div class="sf-props-row">
                <span class="sf-props-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><path d="M12 12v3"/></svg></span>
                <span class="sf-props-key">color</span>
                <span class="sf-props-val"><span class="sf-props-dot" aria-hidden="true"></span><span class="sf-props-num">#888888</span></span>
              </div>
            </div>
          </div>
        </div>
        <p class="sf-footer">Numbers in <em>aliases</em> sorts in the explorer!</p>
      </article>
    </div>
  </section>

  <section id="db-graph">
    <div class="section-head">
      <span class="section-num">05 \u2014 Custom Graph</span>
      <h2>Folder hierarchy \u2014 separate from the vault graph</h2>
      <p class="section-sub">A second graph for project folders, source files, and code functions \u2014 never mixed into the vault Graph View.</p>
    </div>

    <div class="dbg-mock is-functions-off" id="dbg-mock" aria-label="Custom Graph mock">
      <div class="dbg-chrome">
        <span class="dbg-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><path d="M12 12v3"/></svg>
          corvidae-v-2.0.0
        </span>
      </div>
      <div class="dbg-toolbar">
        <button type="button" class="dbg-bonus" id="dbg-bonus" aria-pressed="false" aria-label="Toggle functions" title="Functions">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/></svg>
        </button>
        <div class="dbg-edge-control">
          <span>Edge length</span>
          <input type="range" id="dbg-edge" min="40" max="420" step="5" value="420" aria-label="Edge length"/>
        </div>
      </div>
      <div class="dbg-stage" id="dbg-stage">
        <svg class="dbg-canvas" id="dbg-canvas" viewBox="0 0 900 560" preserveAspectRatio="xMidYMid meet">
          <g id="dbg-viewport">
            <g id="dbg-edges"></g>
            <g id="dbg-nodes"></g>
          </g>
        </svg>
      </div>
      <script type="application/json" id="dbg-data">{"r":"src","n":[{"id":"src","k":"d","l":"src","p":null},{"id":"src/callout-links","k":"d","l":"callout-links","p":"src"},{"id":"src/callout-links/index.ts","k":"f","l":"callout-links_index.ts","p":"src/callout-links"},{"id":"src/callout-links/processor.ts","k":"f","l":"callout-links_processor.ts","p":"src/callout-links"},{"id":"src/custom-graph","k":"d","l":"custom-graph","p":"src"},{"id":"src/custom-graph/dev-md.ts","k":"f","l":"custom-graph_dev-md.ts","p":"src/custom-graph"},{"id":"src/custom-graph/function-parse.ts","k":"f","l":"custom-graph_function-parse.ts","p":"src/custom-graph"},{"id":"src/custom-graph/hierarchy.ts","k":"f","l":"custom-graph_hierarchy.ts","p":"src/custom-graph"},{"id":"src/custom-graph/index.ts","k":"f","l":"custom-graph_index.ts","p":"src/custom-graph"},{"id":"src/custom-graph/manager.ts","k":"f","l":"custom-graph_manager.ts","p":"src/custom-graph"},{"id":"src/custom-graph/model.ts","k":"f","l":"custom-graph_model.ts","p":"src/custom-graph"},{"id":"src/custom-graph/paths.ts","k":"f","l":"custom-graph_paths.ts","p":"src/custom-graph"},{"id":"src/custom-graph/renderer.ts","k":"f","l":"custom-graph_renderer.ts","p":"src/custom-graph"},{"id":"src/custom-graph/ribbon.ts","k":"f","l":"custom-graph_ribbon.ts","p":"src/custom-graph"},{"id":"src/custom-graph/view.ts","k":"f","l":"custom-graph_view.ts","p":"src/custom-graph"},{"id":"src/dashboard","k":"d","l":"dashboard","p":"src"},{"id":"src/dashboard/box-modal.ts","k":"f","l":"dashboard_box-modal.ts","p":"src/dashboard"},{"id":"src/dashboard/box-store.ts","k":"f","l":"dashboard_box-store.ts","p":"src/dashboard"},{"id":"src/dashboard/box-types.ts","k":"f","l":"dashboard_box-types.ts","p":"src/dashboard"},{"id":"src/dashboard/browser-box-embed.ts","k":"f","l":"dashboard_browser-box-embed.ts","p":"src/dashboard"},{"id":"src/dashboard/browser-integration.ts","k":"f","l":"dashboard_browser-integration.ts","p":"src/dashboard"},{"id":"src/dashboard/browser-scroll.ts","k":"f","l":"dashboard_browser-scroll.ts","p":"src/dashboard"},{"id":"src/dashboard/crow-control.ts","k":"f","l":"dashboard_crow-control.ts","p":"src/dashboard"},{"id":"src/dashboard/embed-workspace.ts","k":"f","l":"dashboard_embed-workspace.ts","p":"src/dashboard"},{"id":"src/dashboard/graph-box-embed.ts","k":"f","l":"dashboard_graph-box-embed.ts","p":"src/dashboard"},{"id":"src/dashboard/index.ts","k":"f","l":"dashboard_index.ts","p":"src/dashboard"},{"id":"src/dashboard/layout.ts","k":"f","l":"dashboard_layout.ts","p":"src/dashboard"},{"id":"src/dashboard/model.ts","k":"f","l":"dashboard_model.ts","p":"src/dashboard"},{"id":"src/dashboard/note-box-embed.ts","k":"f","l":"dashboard_note-box-embed.ts","p":"src/dashboard"},{"id":"src/dashboard/note-suggest.ts","k":"f","l":"dashboard_note-suggest.ts","p":"src/dashboard"},{"id":"src/dashboard/terminal-box-embed.ts","k":"f","l":"dashboard_terminal-box-embed.ts","p":"src/dashboard"},{"id":"src/dashboard/terminal-integration.ts","k":"f","l":"dashboard_terminal-integration.ts","p":"src/dashboard"},{"id":"src/dashboard/ticket-box-embed.ts","k":"f","l":"dashboard_ticket-box-embed.ts","p":"src/dashboard"},{"id":"src/dashboard/ticket-callouts.ts","k":"f","l":"dashboard_ticket-callouts.ts","p":"src/dashboard"},{"id":"src/dashboard/view.ts","k":"f","l":"dashboard_view.ts","p":"src/dashboard"},{"id":"src/dev.md","k":"f","l":"src_dev.md","p":"src"},{"id":"src/explorer","k":"d","l":"explorer","p":"src"},{"id":"src/explorer/development-folders.ts","k":"f","l":"explorer_development-folders.ts","p":"src/explorer"},{"id":"src/explorer/file-explorer-patch.ts","k":"f","l":"explorer_file-explorer-patch.ts","p":"src/explorer"},{"id":"src/explorer/file-tags.ts","k":"f","l":"explorer_file-tags.ts","p":"src/explorer"},{"id":"src/explorer/index.ts","k":"f","l":"explorer_index.ts","p":"src/explorer"},{"id":"src/explorer/manager.ts","k":"f","l":"explorer_manager.ts","p":"src/explorer"},{"id":"src/explorer/sort.ts","k":"f","l":"explorer_sort.ts","p":"src/explorer"},{"id":"src/folder-note","k":"d","l":"folder-note","p":"src"},{"id":"src/folder-note/create-ui.ts","k":"f","l":"folder-note_create-ui.ts","p":"src/folder-note"},{"id":"src/folder-note/index.ts","k":"f","l":"folder-note_index.ts","p":"src/folder-note"},{"id":"src/folder-note/manager.ts","k":"f","l":"folder-note_manager.ts","p":"src/folder-note"},{"id":"src/folder-note/paths.ts","k":"f","l":"folder-note_paths.ts","p":"src/folder-note"},{"id":"src/frontmatter","k":"d","l":"frontmatter","p":"src"},{"id":"src/frontmatter/utils.ts","k":"f","l":"frontmatter_utils.ts","p":"src/frontmatter"},{"id":"src/graph","k":"d","l":"graph","p":"src"},{"id":"src/graph/embed-links.ts","k":"f","l":"graph_embed-links.ts","p":"src/graph"},{"id":"src/graph/frontmatter-links.ts","k":"f","l":"graph_frontmatter-links.ts","p":"src/graph"},{"id":"src/graph/index.ts","k":"f","l":"graph_index.ts","p":"src/graph"},{"id":"src/graph/legend.ts","k":"f","l":"graph_legend.ts","p":"src/graph"},{"id":"src/graph/patcher.ts","k":"f","l":"graph_patcher.ts","p":"src/graph"},{"id":"src/graph/types.ts","k":"f","l":"graph_types.ts","p":"src/graph"},{"id":"src/html-codeblock","k":"d","l":"html-codeblock","p":"src"},{"id":"src/html-codeblock/index.ts","k":"f","l":"html-codeblock_index.ts","p":"src/html-codeblock"},{"id":"src/html-codeblock/processor.ts","k":"f","l":"html-codeblock_processor.ts","p":"src/html-codeblock"},{"id":"src/html-codeblock/render-child.ts","k":"f","l":"html-codeblock_render-child.ts","p":"src/html-codeblock"},{"id":"src/hybrid-link","k":"d","l":"hybrid-link","p":"src"},{"id":"src/hybrid-link/index.ts","k":"f","l":"hybrid-link_index.ts","p":"src/hybrid-link"},{"id":"src/hybrid-link/manager.ts","k":"f","l":"hybrid-link_manager.ts","p":"src/hybrid-link"},{"id":"src/hybrid-link/resolve.ts","k":"f","l":"hybrid-link_resolve.ts","p":"src/hybrid-link"},{"id":"src/i18n","k":"d","l":"i18n","p":"src"},{"id":"src/i18n/de.ts","k":"f","l":"i18n_de.ts","p":"src/i18n"},{"id":"src/i18n/en.ts","k":"f","l":"i18n_en.ts","p":"src/i18n"},{"id":"src/i18n/index.ts","k":"f","l":"i18n_index.ts","p":"src/i18n"},{"id":"src/i18n/types.ts","k":"f","l":"i18n_types.ts","p":"src/i18n"},{"id":"src/main.ts","k":"f","l":"src_main.ts","p":"src"},{"id":"src/note-bootstrap","k":"d","l":"note-bootstrap","p":"src"},{"id":"src/note-bootstrap/index.ts","k":"f","l":"note-bootstrap_index.ts","p":"src/note-bootstrap"},{"id":"src/note-bootstrap/manager.ts","k":"f","l":"note-bootstrap_manager.ts","p":"src/note-bootstrap"},{"id":"src/properties","k":"d","l":"properties","p":"src"},{"id":"src/properties/index.ts","k":"f","l":"properties_index.ts","p":"src/properties"},{"id":"src/properties/link.ts","k":"f","l":"properties_link.ts","p":"src/properties"},{"id":"src/properties/shared.ts","k":"f","l":"properties_shared.ts","p":"src/properties"},{"id":"src/safe-explorer","k":"d","l":"safe-explorer","p":"src"},{"id":"src/settings","k":"d","l":"settings","p":"src"},{"id":"src/settings/index.ts","k":"f","l":"settings_index.ts","p":"src/settings"},{"id":"src/settings/open-tips-note.ts","k":"f","l":"settings_open-tips-note.ts","p":"src/settings"},{"id":"src/settings/setting-tab.ts","k":"f","l":"settings_setting-tab.ts","p":"src/settings"},{"id":"src/settings/tips-asset.ts","k":"f","l":"settings_tips-asset.ts","p":"src/settings"},{"id":"src/settings/tips-view.ts","k":"f","l":"settings_tips-view.ts","p":"src/settings"},{"id":"src/settings/types.ts","k":"f","l":"settings_types.ts","p":"src/settings"},{"id":"src/table-formulas","k":"d","l":"table-formulas","p":"src"},{"id":"src/table-formulas/index.ts","k":"f","l":"table-formulas_index.ts","p":"src/table-formulas"},{"id":"src/table-formulas/layout.ts","k":"f","l":"table-formulas_layout.ts","p":"src/table-formulas"},{"id":"src/table-formulas/parse.ts","k":"f","l":"table-formulas_parse.ts","p":"src/table-formulas"},{"id":"src/table-formulas/processor.ts","k":"f","l":"table-formulas_processor.ts","p":"src/table-formulas"},{"id":"src/tickets","k":"d","l":"tickets","p":"src"},{"id":"src/tickets/activate.ts","k":"f","l":"tickets_activate.ts","p":"src/tickets"},{"id":"src/tickets/folder-suggest.ts","k":"f","l":"tickets_folder-suggest.ts","p":"src/tickets"},{"id":"src/tickets/index.ts","k":"f","l":"tickets_index.ts","p":"src/tickets"},{"id":"src/tickets/manager.ts","k":"f","l":"tickets_manager.ts","p":"src/tickets"},{"id":"src/tickets/settings-section.ts","k":"f","l":"tickets_settings-section.ts","p":"src/tickets"},{"id":"src/tickets/view.ts","k":"f","l":"tickets_view.ts","p":"src/tickets"},{"id":"src/workspace","k":"d","l":"workspace","p":"src"},{"id":"src/workspace/index.ts","k":"f","l":"workspace_index.ts","p":"src/workspace"},{"id":"src/workspace/initial-layout.ts","k":"f","l":"workspace_initial-layout.ts","p":"src/workspace"}],"e":[["src","src/callout-links"],["src/callout-links","src/callout-links/index.ts"],["src/callout-links","src/callout-links/processor.ts"],["src","src/custom-graph"],["src/custom-graph","src/custom-graph/dev-md.ts"],["src/custom-graph","src/custom-graph/function-parse.ts"],["src/custom-graph","src/custom-graph/hierarchy.ts"],["src/custom-graph","src/custom-graph/index.ts"],["src/custom-graph","src/custom-graph/manager.ts"],["src/custom-graph","src/custom-graph/model.ts"],["src/custom-graph","src/custom-graph/paths.ts"],["src/custom-graph","src/custom-graph/renderer.ts"],["src/custom-graph","src/custom-graph/ribbon.ts"],["src/custom-graph","src/custom-graph/view.ts"],["src","src/dashboard"],["src/dashboard","src/dashboard/box-modal.ts"],["src/dashboard","src/dashboard/box-store.ts"],["src/dashboard","src/dashboard/box-types.ts"],["src/dashboard","src/dashboard/browser-box-embed.ts"],["src/dashboard","src/dashboard/browser-integration.ts"],["src/dashboard","src/dashboard/browser-scroll.ts"],["src/dashboard","src/dashboard/crow-control.ts"],["src/dashboard","src/dashboard/embed-workspace.ts"],["src/dashboard","src/dashboard/graph-box-embed.ts"],["src/dashboard","src/dashboard/index.ts"],["src/dashboard","src/dashboard/layout.ts"],["src/dashboard","src/dashboard/model.ts"],["src/dashboard","src/dashboard/note-box-embed.ts"],["src/dashboard","src/dashboard/note-suggest.ts"],["src/dashboard","src/dashboard/terminal-box-embed.ts"],["src/dashboard","src/dashboard/terminal-integration.ts"],["src/dashboard","src/dashboard/ticket-box-embed.ts"],["src/dashboard","src/dashboard/ticket-callouts.ts"],["src/dashboard","src/dashboard/view.ts"],["src","src/dev.md"],["src","src/explorer"],["src/explorer","src/explorer/development-folders.ts"],["src/explorer","src/explorer/file-explorer-patch.ts"],["src/explorer","src/explorer/file-tags.ts"],["src/explorer","src/explorer/index.ts"],["src/explorer","src/explorer/manager.ts"],["src/explorer","src/explorer/sort.ts"],["src","src/folder-note"],["src/folder-note","src/folder-note/create-ui.ts"],["src/folder-note","src/folder-note/index.ts"],["src/folder-note","src/folder-note/manager.ts"],["src/folder-note","src/folder-note/paths.ts"],["src","src/frontmatter"],["src/frontmatter","src/frontmatter/utils.ts"],["src","src/graph"],["src/graph","src/graph/embed-links.ts"],["src/graph","src/graph/frontmatter-links.ts"],["src/graph","src/graph/index.ts"],["src/graph","src/graph/legend.ts"],["src/graph","src/graph/patcher.ts"],["src/graph","src/graph/types.ts"],["src","src/html-codeblock"],["src/html-codeblock","src/html-codeblock/index.ts"],["src/html-codeblock","src/html-codeblock/processor.ts"],["src/html-codeblock","src/html-codeblock/render-child.ts"],["src","src/hybrid-link"],["src/hybrid-link","src/hybrid-link/index.ts"],["src/hybrid-link","src/hybrid-link/manager.ts"],["src/hybrid-link","src/hybrid-link/resolve.ts"],["src","src/i18n"],["src/i18n","src/i18n/de.ts"],["src/i18n","src/i18n/en.ts"],["src/i18n","src/i18n/index.ts"],["src/i18n","src/i18n/types.ts"],["src","src/main.ts"],["src","src/note-bootstrap"],["src/note-bootstrap","src/note-bootstrap/index.ts"],["src/note-bootstrap","src/note-bootstrap/manager.ts"],["src","src/properties"],["src/properties","src/properties/index.ts"],["src/properties","src/properties/link.ts"],["src/properties","src/properties/shared.ts"],["src","src/safe-explorer"],["src","src/settings"],["src/settings","src/settings/index.ts"],["src/settings","src/settings/open-tips-note.ts"],["src/settings","src/settings/setting-tab.ts"],["src/settings","src/settings/tips-asset.ts"],["src/settings","src/settings/tips-view.ts"],["src/settings","src/settings/types.ts"],["src","src/table-formulas"],["src/table-formulas","src/table-formulas/index.ts"],["src/table-formulas","src/table-formulas/layout.ts"],["src/table-formulas","src/table-formulas/parse.ts"],["src/table-formulas","src/table-formulas/processor.ts"],["src","src/tickets"],["src/tickets","src/tickets/activate.ts"],["src/tickets","src/tickets/folder-suggest.ts"],["src/tickets","src/tickets/index.ts"],["src/tickets","src/tickets/manager.ts"],["src/tickets","src/tickets/settings-section.ts"],["src/tickets","src/tickets/view.ts"],["src","src/workspace"],["src/workspace","src/workspace/index.ts"],["src/workspace","src/workspace/initial-layout.ts"]],"f":[["src/callout-links/processor.ts",["headingLevel","isExternalHref","firstCalloutExternalUrl","faviconUrlForPage","enhanceCalloutFavicons","collectSectionCalloutUrls","openUrlsStaggered","enhanceHeadingOpenLinks","registerCalloutLinkEnhancer"]],["src/custom-graph/dev-md.ts",["createCustomGraphId","getConfiguredCustomGraphs","findCustomGraphById","isAnyCustomGraphDevMd","nodesEqual","readStoredNodes","syncDevMd","syncAllDevMd"]],["src/custom-graph/function-parse.ts",["isCodeFilePath","parseFunctionsFromSource","functionNodeId"]],["src/custom-graph/hierarchy.ts",["basename","parentPath","fileNodeLabel","isUnderScanRoot","buildHierarchyModel","hierarchyToDevMdEntries","findGraphIdForDevMdPath","findGraphIdForFolderPath","resolveProjectFolder"]],["src/custom-graph/manager.ts",["syncAndRefresh","activate","openGraph","onExplorerDevClick","openGraphReplacingActiveLeaf","onVaultChange","refreshOpenViews"]],["src/custom-graph/paths.ts",["getDevMdPath","isDevMdPath","resolveCodeScanRoot"]],["src/custom-graph/renderer.ts",["clearEl","setClass","nodeRadius","bindInput","getRootNode","pinRoot","centerCameraOnRoot","wake","clientToWorld","applyTransform","rebuildDom","start","step","placeFunctions","paint"]],["src/custom-graph/ribbon.ts",["addEntry"]],["src/custom-graph/view.ts",["onOpen","onClose","refresh","renderToolbar","handleNodeClick","clampEdgeLength"]],["src/dashboard/box-modal.ts",["syncTypeSettingVisibility","scheduleBrowserLinkPreview","resolveNotePath","handleSave","handleDelete"]],["src/dashboard/box-store.ts",["normalizeBoxType","applyTypeFields","persist","normalizeBox"]],["src/dashboard/box-types.ts",["getBarDisplayCols","getBarBoxWidthPx"]],["src/dashboard/browser-box-embed.ts",["mount","showUnavailable"]],["src/dashboard/browser-integration.ts",["isWebViewerEnabled","normalizeBrowserUrl","buildWebViewerViewState"]],["src/dashboard/browser-scroll.ts",["applyBrowserScrollbarHiding"]],["src/dashboard/crow-control.ts",["ensureButtons","ensureGraphButton","ensureCrowButton","orderButtons","openStandardGraph"]],["src/dashboard/embed-workspace.ts",["getLeafContainerEl","isLeafInEmbeddedWorkspace","isDashboardGraphEmbed","getEmbeddedRootSplit","createEmbeddedLeaf","destroyEmbeddedLeaf","reattachEmbeddedLeaf"]],["src/dashboard/graph-box-embed.ts",["scheduleCleanup","openInMainTab","cleanupEmbeddedNoteViews","restoreGraphView","patchGraphLeaf","mount"]],["src/dashboard/layout.ts",["toggleBar","syncLayout","collapseToFull","dedupeFullDashboardsInMain","ensureSplitWithBar","applyBarSplitDimensions","findMainContentLeaf","findBarLeavesInMain","findBarLeafForContent","shareHorizontalSplit","getMainTargetLeaf","isContentLeaf"]],["src/dashboard/model.ts",["shouldSkipPath","readProjectMeta","collectDashboardProjects"]],["src/dashboard/note-box-embed.ts",["mount","ensurePreviewMode"]],["src/dashboard/note-suggest.ts",["getNoteDisplayLabel"]],["src/dashboard/terminal-box-embed.ts",["mount","showUnavailable"]],["src/dashboard/terminal-integration.ts",["getAppPlugins","getTerminalSettings","isProfilePlatformCompatible","isEmbeddableProfile","isTerminalPluginEnabled","resolveDefaultTerminalProfile","buildTerminalViewState"]],["src/dashboard/ticket-box-embed.ts",["disposeMount","syncAllMounted","mount"]],["src/dashboard/ticket-callouts.ts",["parseCalloutBlocks","extractCalloutBlock","findTicketCalloutStartIndices","extractLastTicketCallout","extractAllTicketCallouts","filterTicketAlerts","resolveTicketLogMarkdown"]],["src/dashboard/view.ts",["onOpen","onClose","pruneSelection","selectBox","syncSelectionUi","syncMoveSlots","applyModeClasses","applyBarTabChrome","render","renderBarMode","renderBarBox","renderToolbar","showDashboardMenu","canOpenBoxInTab","openSelectedBoxInTab","renderBoxGrid","syncNoteBoxes","syncGraphBoxes","syncBrowserBoxes","syncTerminalBoxes","syncTicketBoxes","renderMoveSlots","handleMoveTo","renderBox","getGridMetrics","openBoxInTab"]],["src/explorer/development-folders.ts",["normalizeFolderPath","isDevelopmentFolder","isSealedDevelopmentChild","isInsideSealedDevelopmentContent","shouldCollapseExplorerFolder"]],["src/explorer/file-explorer-patch.ts",["refreshExplorerSort","ensureFileExplorerReady","getFileExplorerLeaf"]],["src/explorer/file-tags.ts",["getExplorerFileTag","getExplorerFolderTag","isExcalidrawFile","applyExplorerTag","clearManagedExplorerTags"]],["src/explorer/manager.ts",["isHtmlElement","hideEnabled","folderClickEnabled","setupObserver","hideFolderNotePath","applyHideToPath","hideFolderNotesInNode","maybeHideTitle","hideAllFolderNotes","unhideAllFolderNotes","clearFolderMarks","clearDevSealedMarks","clearAllMarks","refreshExplorerUi","refreshFileTags","refreshDevSealedMarks","refreshFolderMarks","isFolderTitleClick","isCollapseClick","getFolderFromClick","openFolderNote","isSealedFolderClick"]],["src/explorer/sort.ts",["getExplorerSortKey","compareExplorerPaths"]],["src/folder-note/create-ui.ts",["isFileExplorerMenu","addMenuItem","resolveParentFromFile","resolveDefaultParent"]],["src/folder-note/manager.ts",["createFolderNote","handleNoteRename","handleFolderRename","adoptOrMoveNote","syncFolderWithNoteRename","safeCreateFolder","safeCreate","shouldHandleFolder","isExcluded","isProcessing","defer"]],["src/folder-note/paths.ts",["isFolderNotePath","folderPathFromNotePath","notePathForFolder","getFolderNoteForFolder","isInsideFolderNoteFolder","resolveUniqueFolderNotePath"]],["src/frontmatter/utils.ts",["isRecord","hexToPixi","normalizeHexColor","parseSize","resolveFirstAlias"]],["src/graph/embed-links.ts",["isDecoupleEmbedPath","resolveRefPath","isEmbedOnlyDecoupledLink","isEmbedOnlyDecoupledEdge"]],["src/graph/frontmatter-links.ts",["isFrontmatterLinkPropertyEdge"]],["src/graph/legend.ts",["asGraphView","colorKey","displayColor","renderList","open","openEntryInNewTab"]],["src/graph/patcher.ts",["patchRenderer","removeSealedDevelopmentNodes","removeNodeIds","clearNodeGraphics","decoupleNonFrontmatterLinks","decoupleEmbedOnlyLinks","removeGraphLink","resyncForceWorker","patchNode","getLegendEntryForNode"]],["src/html-codeblock/processor.ts",["registerCorvidaeHtmlCodeBlock"]],["src/html-codeblock/render-child.ts",["contentBottom","measure","schedule","offsetTopInDocument","onHashClick","startObservers","injectEmbedAssets","findScrollParent","applyHeight","scrollNoteToOffset"]],["src/hybrid-link/manager.ts",["syncFolder","shouldSync","defer"]],["src/hybrid-link/resolve.ts",["normalizeLinkEntries","buildWikiLinkForFile","getDirectChildPaths","computeAutoLinks","resolveLinkToPath","isAutoLink","getLinkSortKey","sortLinksByAlias","mergeAndSortLinks","readCurrentLinks","linksEqual"]],["src/i18n/index.ts",["initI18n","detectObsidianLocale","resolveLocale","t","getExplorerTagLabel"]],["src/main.ts",["onload","handleFileCreated","createFolderNote","setupGraphHooks","startPatchInterval","stopPatchInterval","getDashboardViews","resyncDashboardGraphEmbeds","resyncDashboardNoteEmbeds","getTicketsViews","activateDashboard","getGraphLeaves","saveSettings","loadSettings"]],["src/note-bootstrap/manager.ts",["onFileCreated","ensureDefaultBodySeparator"]],["src/properties/index.ts",["registerCorvidaePropertyTypes","registerGraphPropertyType"]],["src/properties/link.ts",["registerLinkPropertyType","createLinkWidget"]],["src/properties/shared.ts",["isWikiLinkString","validateLinkPropertyValue"]],["src/settings/open-tips-note.ts",["openTipsNote"]],["src/settings/setting-tab.ts",["renderDevelopmentFoldersSection","renderCustomGraphSection"]],["src/settings/tips-asset.ts",["getTipsAssetPath","readTipsContent"]],["src/settings/tips-view.ts",["stripFrontmatter","onOpen","onClose","renderTips"]],["src/table-formulas/layout.ts",["isEmptyFlowGap","isTableBlock","isColumnTitleBlock","clearItemStyles","unwrapLegacyRows","parseColumn","applyColumns","layoutPreviewSizer","applySideBySideTables"]],["src/table-formulas/parse.ts",["stripCellMarkup","isCorvidaeFormula","isEmptyPlaceholder","parseMergeKind","isMergeMarker","parseFormulaKind","isSumFormula","hasEuroMark","formatEuro","parseAmount"]],["src/table-formulas/processor.ts",["isEditableSurface","isInReadingPreview","getReadingPreviewEl","overlayHost","cellSourceText","applyOverlay","isHeaderCell","tableRows","resetMerges","findMergeLeftAnchor","findMergeUpAnchor","applyMerges","sumColumnAbove","enhanceFormulasAndEuro","preserveEmptyCells","enhanceTable","enhanceReadingPreview","enhanceActiveReadingViews","registerCorvidaeTableFormulas"]],["src/tickets/activate.ts",["activateTicketsSidebar","ensureRightSidebarReferenceLeaf","findRightSidebarReferenceLeaf","findRightSidebarTicketsLeaf","detachMainAreaTicketLeaves","dedupeRightSidebarTicketLeaves","isTicketsLeaf","isRightSidebarLeaf","isMainAreaLeaf","findHorizontalSplitAncestor","applySidebarTicketsSplitDimensions"]],["src/tickets/folder-suggest.ts",["collectFolders"]],["src/tickets/settings-section.ts",["createProjectId","renderTicketProjectsEditor","renderTicketsSettingsSection","renderProjectCard"]],["src/tickets/view.ts",["onOpen","onClose","render","renderProject"]],["src/workspace/initial-layout.ts",["ensureFilePropertiesSidebarOnFirstRun","moveFilePropertiesLeafFirst","isRightSidebarLeaf"]]]}<\/script>
    </div>

  </section>

  <section id="editor">
    <div class="section-head">
      <span class="section-num">06 \u2014 Coding Editor</span>
      <h2>Diffs on a timeline you can open</h2>
      <p class="section-sub">An editor with git-like history: scrub commits, open the time axis, and see visual branching next to the change.</p>
    </div>

    <div class="ed-mock coming-soon-wrap" id="ed-mock" aria-label="Coding Editor mock">
      <div class="coming-soon-overlay" aria-hidden="true">
        <span class="coming-soon-banner">Coming Soon</span>
      </div>
      <div class="ed-chrome">
        <span class="lang">Coding Editor</span>
        <span class="hint">timeline \xB7 branching</span>
      </div>
      <div class="ed-body">
        <aside class="ed-timeline">
          <div class="ed-timeline-title">Branches</div>
          <svg class="ed-branch-svg" id="ed-branch-svg" viewBox="0 0 220 200" aria-hidden="true">
            <text x="8" y="28">main</text>
            <path class="lane" d="M40 40 H190"/>
            <circle class="commit main is-on" data-commit="0" cx="55" cy="40" r="6"/>
            <circle class="commit main" data-commit="1" cx="100" cy="40" r="6"/>
            <circle class="commit main" data-commit="2" cx="145" cy="40" r="6"/>
            <circle class="commit main" data-commit="3" cx="190" cy="40" r="6"/>
            <path class="lane feature" d="M100 40 C100 70, 100 90, 130 110 H190"/>
            <text x="8" y="114">feature/db-graph</text>
            <circle class="commit" data-commit="4" cx="130" cy="110" r="6"/>
            <circle class="commit" data-commit="5" cx="190" cy="110" r="6"/>
          </svg>
          <div class="ed-commit-meta" id="ed-commit-meta">
            <div><span class="hash">a1c3e7</span> \xB7 main</div>
            <div class="msg">init workspace shell</div>
          </div>
        </aside>
        <div class="ed-editor">
          <div class="ed-tabbar">
            <span>schema.ts</span>
            <span class="ext">TypeScript</span>
          </div>
          <pre class="ed-code" id="ed-code"></pre>
        </div>
      </div>
      <div class="ed-scrub">
        <span class="lbl">Timeline</span>
        <input type="range" id="ed-range" min="0" max="5" value="0" step="1" aria-label="Scrub commits on timeline">
        <span class="axis-open" id="ed-axis-label">open axis \xB7 a1c3e7</span>
      </div>
    </div>
  </section>

  <section id="neural">
    <div class="section-head">
      <span class="section-num">07 \u2014 Neural Network</span>
      <h2>See vectors learn \u2014 open source</h2>
      <p class="section-sub">A transparent training view: weights, activations, and loss \u2014 so anyone can understand how you teach a machine inside your own game.</p>
    </div>

    <div class="nn-mock coming-soon-wrap" aria-label="Neural Network mock">
      <div class="coming-soon-overlay" aria-hidden="true">
        <span class="coming-soon-banner">Coming Soon</span>
      </div>
      <div class="nn-chrome">
        <span class="lang">Neural Network</span>
        <span class="hint">vectors \xB7 learning \xB7 open source</span>
      </div>
      <div class="nn-body">
        <div class="nn-vis">
          <svg class="nn-canvas" id="nn-canvas" viewBox="0 0 520 480" preserveAspectRatio="xMidYMid meet">
            <text class="nn-layer-lbl" x="80" y="36">Input</text>
            <text class="nn-layer-lbl" x="260" y="36">Hidden</text>
            <text class="nn-layer-lbl" x="440" y="36">Output</text>
            <g id="nn-edges">
              <line class="nn-edge" data-from="i0" data-to="h0" x1="80" y1="120" x2="260" y2="100" style="opacity:0.45"/>
              <line class="nn-edge" data-from="i0" data-to="h1" x1="80" y1="120" x2="260" y2="200" style="opacity:0.35"/>
              <line class="nn-edge" data-from="i0" data-to="h2" x1="80" y1="120" x2="260" y2="300" style="opacity:0.28"/>
              <line class="nn-edge" data-from="i0" data-to="h3" x1="80" y1="120" x2="260" y2="400" style="opacity:0.22"/>
              <line class="nn-edge" data-from="i1" data-to="h0" x1="80" y1="240" x2="260" y2="100" style="opacity:0.4"/>
              <line class="nn-edge" data-from="i1" data-to="h1" x1="80" y1="240" x2="260" y2="200" style="opacity:0.5"/>
              <line class="nn-edge" data-from="i1" data-to="h2" x1="80" y1="240" x2="260" y2="300" style="opacity:0.38"/>
              <line class="nn-edge" data-from="i1" data-to="h3" x1="80" y1="240" x2="260" y2="400" style="opacity:0.3"/>
              <line class="nn-edge" data-from="i2" data-to="h0" x1="80" y1="360" x2="260" y2="100" style="opacity:0.25"/>
              <line class="nn-edge" data-from="i2" data-to="h1" x1="80" y1="360" x2="260" y2="200" style="opacity:0.32"/>
              <line class="nn-edge" data-from="i2" data-to="h2" x1="80" y1="360" x2="260" y2="300" style="opacity:0.48"/>
              <line class="nn-edge" data-from="i2" data-to="h3" x1="80" y1="360" x2="260" y2="400" style="opacity:0.42"/>
              <line class="nn-edge" data-from="h0" data-to="o0" x1="260" y1="100" x2="440" y2="180" style="opacity:0.4"/>
              <line class="nn-edge" data-from="h0" data-to="o1" x1="260" y1="100" x2="440" y2="300" style="opacity:0.28"/>
              <line class="nn-edge" data-from="h1" data-to="o0" x1="260" y1="200" x2="440" y2="180" style="opacity:0.5"/>
              <line class="nn-edge" data-from="h1" data-to="o1" x1="260" y1="200" x2="440" y2="300" style="opacity:0.35"/>
              <line class="nn-edge" data-from="h2" data-to="o0" x1="260" y1="300" x2="440" y2="180" style="opacity:0.33"/>
              <line class="nn-edge" data-from="h2" data-to="o1" x1="260" y1="300" x2="440" y2="300" style="opacity:0.46"/>
              <line class="nn-edge" data-from="h3" data-to="o0" x1="260" y1="400" x2="440" y2="180" style="opacity:0.24"/>
              <line class="nn-edge" data-from="h3" data-to="o1" x1="260" y1="400" x2="440" y2="300" style="opacity:0.4"/>
            </g>
            <g id="nn-nodes">
              <g class="nn-node-g" data-id="i0" transform="translate(80,120)"><circle class="nn-node is-on" r="18"/><text class="nn-val">0.20</text></g>
              <g class="nn-node-g" data-id="i1" transform="translate(80,240)"><circle class="nn-node is-on" r="18"/><text class="nn-val">0.80</text></g>
              <g class="nn-node-g" data-id="i2" transform="translate(80,360)"><circle class="nn-node is-on" r="18"/><text class="nn-val">0.45</text></g>
              <g class="nn-node-g" data-id="h0" transform="translate(260,100)"><circle class="nn-node" r="18"/><text class="nn-val">0.00</text></g>
              <g class="nn-node-g" data-id="h1" transform="translate(260,200)"><circle class="nn-node" r="18"/><text class="nn-val">0.00</text></g>
              <g class="nn-node-g" data-id="h2" transform="translate(260,300)"><circle class="nn-node" r="18"/><text class="nn-val">0.00</text></g>
              <g class="nn-node-g" data-id="h3" transform="translate(260,400)"><circle class="nn-node" r="18"/><text class="nn-val">0.00</text></g>
              <g class="nn-node-g" data-id="o0" transform="translate(440,180)"><circle class="nn-node" r="18"/><text class="nn-val">0.00</text></g>
              <g class="nn-node-g" data-id="o1" transform="translate(440,300)"><circle class="nn-node" r="18"/><text class="nn-val">0.00</text></g>
            </g>
          </svg>
        </div>
        <aside class="nn-train">
          <div class="nn-train-title">Train</div>
          <div class="nn-block">
            <div class="k">Input vector</div>
            <div class="v vec" id="nn-vector">[0.20, 0.80, 0.45]</div>
          </div>
          <div class="nn-block">
            <div class="k">Epoch \xB7 loss</div>
            <div class="v" id="nn-epoch">epoch 12 \xB7 loss 0.184</div>
            <svg class="nn-spark" id="nn-spark" viewBox="0 0 200 48" aria-hidden="true">
              <line x1="0" y1="40" x2="200" y2="40"/>
              <polyline id="nn-spark-line" points="0,38 20,34 40,30 60,28 80,22 100,24 120,18 140,16 160,14 180,12 200,11"/>
            </svg>
          </div>
          <button type="button" class="nn-btn" id="nn-step">Step forward</button>
          <div class="nn-foot">open source \xB7 learn how machines learn</div>
        </aside>
      </div>
    </div>
  </section>

  <section id="your-code">
    <div class="section-head">
      <span class="section-num">08 \u2014 Your code?</span>
      <h2>Build it. Mock it. Ship it.</h2>
      <p class="section-sub">Fork the repo, show your feature as a mock on this page, submit both \u2014 we test it, and maybe it ships.</p>
    </div>

    <div class="yc-steps" aria-label="How to submit your code">
      <article class="yc-step" tabindex="0">
        <span class="yc-step-num">01</span>
        <h3 class="yc-step-title">Take the code</h3>
        <p>Grab CORVIDAE from GitHub and start from the source \u2014 <a href="https://github.com/einfachsj/obsidian-corvidae">github.com/einfachsj/obsidian-corvidae</a>.</p>
      </article>
      <article class="yc-step" tabindex="0">
        <span class="yc-step-num">02</span>
        <h3 class="yc-step-title">Mock your feature</h3>
        <p>Edit this landing page: add a mock of your feature and introduce it the same way sections 01\u201307 do.</p>
      </article>
      <article class="yc-step" tabindex="0">
        <span class="yc-step-num">03</span>
        <h3 class="yc-step-title">Submit &amp; wait</h3>
        <p>Send your code together with the edited landing page \u2014 then wait while we look it over.</p>
      </article>
      <article class="yc-step" tabindex="0">
        <span class="yc-step-num">04</span>
        <h3 class="yc-step-title">Tested \xB7 maybe shipped</h3>
        <p>We test it; if it fits, it may land in CORVIDAE. Keep your fork and build it however you want.</p>
      </article>
    </div>
  </section>

  <section id="about">
    <div class="about-wrap">
      <div class="about-manifesto" id="about-manifesto">
        <span class="about-num">09 \u2014 About</span>
        <h2 class="about-display">One plugin, four orbits, no chaos.</h2>
        <p class="about-lead">CORVIDAE started as a vault tool and became the backbone. Every ticket, every dependency graph, every dashboard I open to check where a project stands \u2014 it all lives here first. Obsidian made that possible: a note-taking app with a plugin API open enough to become a real development console.</p>
        <div class="about-facts">
          <a href="https://ein.ink">ein.ink</a>
          <span>3 active builds</span>
          <span>1 vault</span>
          <span>Built on Obsidian</span>
        </div>
      </div>

      <div class="about-orbit" id="about-orbit" aria-roledescription="carousel" aria-label="Projects">
        <div class="about-orbit-stage">
          <div class="about-orbit-track" id="about-orbit-track">
            <article class="about-orbit-slide" data-label="CORVIDAE" aria-label="1 of 4">
              <div class="about-circle">
                <div class="about-eyebrow">Obsidian Plugin</div>
                <h3 class="about-circle-title">CORVIDAE <em>runs it all</em></h3>
                <p class="about-circle-sub">Dev console inside a vault.</p>
                <p class="about-circle-pitch">Dashboard, tickets, Custom Graph, vault bar, HTML fences \u2014 every project tracked in one place before it ships.</p>
                <div class="about-ring" aria-hidden="true">
                  <span>Dashboard</span><span>Tickets</span><span>Graph</span><span>Ship</span>
                </div>
                <div class="about-examples">
                  <span class="about-ex">Tickets</span>
                  <span class="about-ex">Vault Graph</span>
                  <span class="about-ex">Custom Graph</span>
                  <span class="about-ex">HTML</span>
                </div>
                <a class="about-soft-link" href="#dashboard">see the plugin \u2191</a>
              </div>
            </article>

            <article class="about-orbit-slide" data-label="LIFE ON AMNESIA" aria-label="2 of 4">
              <div class="about-circle is-muted">
                <div class="about-eyebrow">MMORPG \xB7 Cards \xB7 Sidescroller</div>
                <h3 class="about-circle-title">LIFE ON <em>AMNESIA</em></h3>
                <p class="about-circle-sub">Daylight builds. Nightfall hunts.</p>
                <p class="about-circle-pitch">By day you farm, craft, and carve a colony into a world that forgot its own name. By night the planet wakes hungry \u2014 and you fight to keep what you built. Every card is a breath closer to slipping the black hole\u2019s pull\u2026 and escaping Amnesia alive.</p>
                <div class="about-examples">
                  <span class="about-ex">Magic &amp; Sci-Fi</span>
                  <span class="about-ex">Simulation</span>
                  <span class="about-ex">Dyson Sphere</span>
                  <span class="about-ex">Dungeon Nights</span>
                </div>
              </div>
            </article>

            <article class="about-orbit-slide" data-label="Classified" aria-label="3 of 4">
              <div class="about-circle is-classified">
                <div class="about-eyebrow">Classified \xB7 Unreleased</div>
                <p class="about-redacted" tabindex="0" title="hover to peek">
                  <span class="about-redacted-mask" aria-hidden="true">\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588</span>
                  <span class="about-redacted-code">ein.ink/spacegame</span>
                </p>
                <h3 class="about-circle-title">Classified space game</h3>
                <p class="about-circle-sub">Build the shell. Feed the sun.</p>
                <p class="about-circle-pitch">A single-player orbit loop kept off the public map \u2014 click, expand, ascend through layers of power around a dying star. Classified for now. Peek the path on ein.ink.</p>
                <div class="about-examples">
                  <span class="about-ex">Idle Clicker</span>
                  <span class="about-ex">Orbital Build</span>
                  <span class="about-ex">Energy Cascade</span>
                  <span class="about-ex">Megastructure</span>
                </div>
              </div>
            </article>

            <article class="about-orbit-slide" data-label="EIN.INK" aria-label="4 of 4">
              <div class="about-circle">
                <div class="about-eyebrow">Web \xB7 Persona \xB7 Space</div>
                <h3 class="about-circle-title">EIN.<em>INK</em></h3>
                <p class="about-circle-sub">Persona in orbit.</p>
                <p class="about-circle-pitch">Public hub \u2014 Space Interface, project cubes, soft paths into community. The orbit that's public by design.</p>
                <div class="about-examples">
                  <span class="about-ex">Space Front</span>
                  <span class="about-ex">Project Cubes</span>
                  <span class="about-ex">Holo Layer</span>
                  <span class="about-ex">Patreon</span>
                </div>
                <a class="about-soft-link" href="https://ein.ink">ein.ink</a>
              </div>
            </article>
          </div>
        </div>

        <div class="about-orbit-controls">
          <button type="button" class="about-orbit-btn" id="about-orbit-prev" aria-label="Previous project">\u2039</button>
          <div class="about-orbit-dots" id="about-orbit-dots" role="tablist" aria-label="Project slides"></div>
          <button type="button" class="about-orbit-btn" id="about-orbit-next" aria-label="Next project">\u203A</button>
        </div>
        <div class="about-orbit-label" id="about-orbit-label"><strong>01</strong> \xB7 CORVIDAE</div>
      </div>

      <div class="about-cta">
        <div class="about-cta-stars" aria-hidden="true">
          <span class="about-cta-star"></span>
          <span class="about-cta-star"></span>
          <span class="about-cta-star"></span>
          <span class="about-cta-star"></span>
          <span class="about-cta-star"></span>
          <span class="about-cta-star"></span>
          <span class="about-cta-star"></span>
          <span class="about-cta-star"></span>
          <span class="about-cta-star"></span>
          <span class="about-cta-star"></span>
          <span class="about-cta-star"></span>
          <span class="about-cta-star"></span>
          <span class="about-cta-star"></span>
          <span class="about-cta-star"></span>
          <span class="about-cta-star"></span>
          <span class="about-cta-star"></span>
        </div>
        <div class="about-cta-inner">
          <p class="about-cta-kicker">Beyond the map</p>
          <h3 class="about-cta-title">There is still <em>so much</em> to explore.</h3>
          <p>Four orbits lit. Entire systems still dark. Follow the work \u2014 or go deeper on Patreon and help plant creative trees.</p>
          <div class="about-cta-row">
            <a class="about-btn ghost" href="https://ein.ink">ein.ink</a>
            <a class="about-btn primary" href="https://www.patreon.com/einfachsj">Patreon</a>
          </div>
        </div>
      </div>
    </div>
  </section>

</div>

<footer>
  <p><a href="https://ein.ink">ein.ink</a></p>
</footer>

<script>
(function () {
  var hotspots = document.querySelectorAll('.hotspot');
  var tree = document.getElementById('mock-tree');
  var graph = document.getElementById('mock-graph');
  var website = document.getElementById('mock-website');
  var tickets = document.getElementById('mock-tickets');
  var consolePane = document.getElementById('mock-console');
  var side = document.getElementById('mock-side');
  var treeTooltip = document.getElementById('tree-tooltip');
  var graphTooltip = document.getElementById('graph-tooltip');
  var websiteTooltip = document.getElementById('website-tooltip');
  var ticketsTooltip = document.getElementById('tickets-tooltip');
  var consoleTooltip = document.getElementById('console-tooltip');
  var sideTooltip = document.getElementById('side-tooltip');
  var floatingTooltips = [treeTooltip, graphTooltip, websiteTooltip, ticketsTooltip, consoleTooltip, sideTooltip];
  var floatingByHotspot = new Map([
    [tree, treeTooltip],
    [graph, graphTooltip],
    [website, websiteTooltip],
    [tickets, ticketsTooltip],
    [consolePane, consoleTooltip],
    [side, sideTooltip]
  ]);

  function clearActive() {
    hotspots.forEach(function (el) { el.classList.remove('is-active'); });
  }

  function hideFloatingTooltips() {
    floatingTooltips.forEach(function (tip) {
      if (!tip) return;
      tip.classList.remove('is-open');
      tip.setAttribute('aria-hidden', 'true');
    });
  }

  function showFloatingTooltip(tip) {
    hideFloatingTooltips();
    if (!tip) return;
    tip.classList.add('is-open');
    tip.setAttribute('aria-hidden', 'false');
  }

  hotspots.forEach(function (el) {
    function activate() {
      clearActive();
      el.classList.add('is-active');
      showFloatingTooltip(floatingByHotspot.get(el) || null);
    }
    function deactivate() {
      el.classList.remove('is-active');
      if (!document.querySelector('.hotspot:hover, .hotspot:focus-within')) {
        hideFloatingTooltips();
      }
    }
    el.addEventListener('mouseenter', activate);
    el.addEventListener('focus', activate);
    el.addEventListener('mouseleave', deactivate);
    el.addEventListener('blur', deactivate);
  });

  var menu = document.getElementById('ctx-menu');

  function hideMenu() {
    if (!menu) return;
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
  }

  function showMenu(x, y) {
    if (!menu) return;
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    var pad = 8;
    var w = menu.offsetWidth || 220;
    var h = menu.offsetHeight || 220;
    var maxX = window.innerWidth - w - pad;
    var maxY = window.innerHeight - h - pad;
    menu.style.left = Math.max(pad, Math.min(x, maxX)) + 'px';
    menu.style.top = Math.max(pad, Math.min(y, maxY)) + 'px';
  }

  if (tree && menu) {
    tree.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      e.stopPropagation();
      showMenu(e.clientX, e.clientY);
    });
    document.addEventListener('mousedown', function (e) {
      if (e.button === 2) return;
      hideMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') hideMenu();
    });
    window.addEventListener('blur', hideMenu);
    window.addEventListener('scroll', hideMenu, true);
  }

  var cbMock = document.getElementById('cb-mock');
  var cbRange = document.getElementById('cb-range');
  var cbLblCode = document.getElementById('cb-lbl-code');
  var cbLblHtml = document.getElementById('cb-lbl-html');
  var cbCode = document.getElementById('cb-code');
  var cbFrame = document.getElementById('cb-frame');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var crowHeroHtml = [
    '<!DOCTYPE html>',
    '<' + 'html lang="en">',
    '<' + 'head>',
    '<meta charset="UTF-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '<title>CROW HERO</title>',
    '<' + 'style>',
    "@import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&family=IBM+Plex+Sans:wght@400&display=swap');",
    '*{box-sizing:border-box;margin:0;padding:0}',
    'html,body{height:100%;overflow:hidden}',
    'body{',
    '  min-height:100%;',
    '  display:flex;flex-direction:column;',
    '  align-items:center;justify-content:center;',
    '  text-align:center;gap:6px;',
    '  background:',
    '    radial-gradient(ellipse 65% 45% at 50% 40%, rgba(255,19,55,0.14), transparent 55%),',
    '    #0c0a0b;',
    "  font-family:'IBM Plex Sans',sans-serif;",
    '  color:#f2e8ea;',
    '}',
    '.bird{font-size:22px;line-height:1}',
    "h1{font-family:'Syne',sans-serif;font-weight:800;",
    '  font-size:28px;letter-spacing:-0.02em;line-height:1}',
    'h1 em{font-style:normal;color:#ff1337}',
    'p{color:#9a858c;font-size:11px;line-height:1.3;max-width:220px}',
    // Split tags so corvidaehtml injectEmbedAssets does not match the preview document.
    '</sty' + 'le>',
    '</he' + 'ad>',
    '<' + 'body>',
    '  <div class="bird" aria-hidden="true"><svg class="corvidae-crow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 3c-1.2 1.8-1.6 3.4-1.5 5.1-.9-.4-1.7-.5-2.6-.3-1.4.3-2.5 1.3-3.1 2.6-.4.8-.5 1.7-.3 2.6.3 1.3 1.2 2.4 2.5 2.9-.7.9-1 2-1 3.2 0 .4.3.7.7.7h.1c.3 0 .6-.2.7-.5.3-1 .8-1.8 1.6-2.4.5 1.4 1.5 2.5 2.9 3.1.3.1.7 0 .8-.3.1-.3 0-.7-.3-.8-1.1-.5-1.9-1.4-2.2-2.6 1.1.2 2.2 0 3.1-.6.9-.6 1.5-1.5 1.7-2.6.6.5 1.4.8 2.2.8.4 0 .7-.3.7-.7 0-.9-.3-1.7-.8-2.4.9-.3 1.6-1 2-1.9.2-.4 0-.9-.4-1.1-.4-.2-.9 0-1.1.4-.3.6-.8 1.1-1.5 1.3-.1-1.2-.6-2.3-1.5-3.1C13.6 4.6 12.9 3.7 12 3z"/></svg></div>',
    '  <h1>CROW <em>HERO</em></h1>',
    '  <p>One pager rendered from a Markdown fence.</p>',
    '</bo' + 'dy>',
    '</ht' + 'ml>'
  ].join('\\n');

  if (cbCode) cbCode.textContent = crowHeroHtml;
  if (cbFrame) cbFrame.srcdoc = crowHeroHtml;

  function applyCbSlide(raw) {
    if (!cbMock) return;
    var v = Number(raw);
    if (isNaN(v)) v = 0;
    var t = reduceMotion ? (v < 50 ? 0 : 1) : v / 100;
    cbMock.style.setProperty('--cb-t', String(t));
    if (cbLblCode) cbLblCode.classList.toggle('is-on', t < 0.5);
    if (cbLblHtml) cbLblHtml.classList.toggle('is-on', t >= 0.5);
  }

  if (cbRange) {
    applyCbSlide(cbRange.value);
    cbRange.addEventListener('input', function () {
      applyCbSlide(cbRange.value);
    });
  }

  /* ---------- Graph View mock: Obsidian-like physics + node drag ---------- */
  (function initGraphMock() {
    try {
    var stage = document.getElementById('gv-stage');
    var svg = document.getElementById('gv-canvas');
    var nodesRoot = document.getElementById('gv-nodes');
    var edgesRoot = document.getElementById('gv-edges');
    if (!stage || !svg || !nodesRoot || !edgesRoot) return;

    var W = 900;
    var H = 560;
    var CX = W / 2;
    var CY = H / 2;
    var nodes = {};
    var nodeList = [];
    var drag = null;
    var raf = 0;
    var running = false;
    var reducePhysics = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var CHARGE = 5200;
    var LINK_DIST = 110;
    var LINK_STRENGTH = 0.06;
    var CENTER = 0.006;
    var FRICTION = 0.88;
    var COLLIDE_PAD = 36;
    var MAX_V = 6;
    var ENERGY_STOP = 0.02;

    Array.prototype.forEach.call(nodesRoot.querySelectorAll('.gv-node'), function (el) {
      var id = el.getAttribute('data-id');
      var x = Number(el.getAttribute('data-x'));
      var y = Number(el.getAttribute('data-y'));
      var r = Number(el.getAttribute('data-r'));
      var kind = el.getAttribute('data-kind');
      var labelSide = el.getAttribute('data-label') || 'right';
      var label = el.querySelector('text');
      var mass = kind === 'main' ? 2.4 : 1;

      if (kind === 'main' && label) {
        label.setAttribute('y', String(r + 6));
        label.setAttribute('x', '0');
        label.setAttribute('text-anchor', 'middle');
      } else if (kind === 'note' && label) {
        var gap = r + 6;
        if (labelSide === 'left') {
          label.setAttribute('x', String(-gap));
          label.setAttribute('text-anchor', 'end');
        } else {
          label.setAttribute('x', String(gap));
          label.setAttribute('text-anchor', 'start');
        }
        label.removeAttribute('y');
      }

      var node = { id: id, el: el, x: x, y: y, vx: 0, vy: 0, r: r, mass: mass, fixed: false };
      nodes[id] = node;
      nodeList.push(node);
      el.setAttribute('transform', 'translate(' + x + ',' + y + ')');
    });

    var links = Array.prototype.map.call(edgesRoot.querySelectorAll('line'), function (line) {
      return {
        el: line,
        source: nodes[line.getAttribute('data-from')],
        target: nodes[line.getAttribute('data-to')]
      };
    }).filter(function (l) { return l.source && l.target; });

    function syncEdges() {
      for (var i = 0; i < links.length; i++) {
        var link = links[i];
        link.el.setAttribute('x1', String(link.source.x));
        link.el.setAttribute('y1', String(link.source.y));
        link.el.setAttribute('x2', String(link.target.x));
        link.el.setAttribute('y2', String(link.target.y));
      }
    }

    function placeNode(node) {
      node.el.setAttribute('transform', 'translate(' + node.x + ',' + node.y + ')');
    }

    function clamp(v, lo, hi) {
      return v < lo ? lo : v > hi ? hi : v;
    }

    function kick() {
      if (reducePhysics || running) return;
      running = true;
      raf = window.requestAnimationFrame(tick);
    }

    function tick() {
      var i, j, a, b, dx, dy, dist, dist2, f, nx, ny, minDist, overlap;
      var energy = 0;

      for (i = 0; i < nodeList.length; i++) {
        a = nodeList[i];
        for (j = i + 1; j < nodeList.length; j++) {
          b = nodeList[j];
          dx = b.x - a.x;
          dy = b.y - a.y;
          dist2 = dx * dx + dy * dy;
          if (dist2 < 0.01) {
            dx = (Math.random() - 0.5) * 0.4;
            dy = (Math.random() - 0.5) * 0.4;
            dist2 = dx * dx + dy * dy;
          }
          f = CHARGE / dist2;
          dist = Math.sqrt(dist2);
          nx = dx / dist;
          ny = dy / dist;
          if (!a.fixed) {
            a.vx -= (nx * f) / a.mass;
            a.vy -= (ny * f) / a.mass;
          }
          if (!b.fixed) {
            b.vx += (nx * f) / b.mass;
            b.vy += (ny * f) / b.mass;
          }
        }
      }

      for (i = 0; i < links.length; i++) {
        a = links[i].source;
        b = links[i].target;
        dx = b.x - a.x;
        dy = b.y - a.y;
        dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
        f = (dist - LINK_DIST) * LINK_STRENGTH;
        nx = (dx / dist) * f;
        ny = (dy / dist) * f;
        if (!a.fixed) {
          a.vx += nx / a.mass;
          a.vy += ny / a.mass;
        }
        if (!b.fixed) {
          b.vx -= nx / b.mass;
          b.vy -= ny / b.mass;
        }
      }

      for (i = 0; i < nodeList.length; i++) {
        a = nodeList[i];
        if (a.fixed) continue;
        a.vx += (CX - a.x) * CENTER;
        a.vy += (CY - a.y) * CENTER;
      }

      for (i = 0; i < nodeList.length; i++) {
        a = nodeList[i];
        if (a.fixed) {
          a.vx = 0;
          a.vy = 0;
          continue;
        }
        a.vx *= FRICTION;
        a.vy *= FRICTION;
        a.vx = clamp(a.vx, -MAX_V, MAX_V);
        a.vy = clamp(a.vy, -MAX_V, MAX_V);
        a.x += a.vx;
        a.y += a.vy;
        a.x = clamp(a.x, 40, W - 40);
        a.y = clamp(a.y, 40, H - 40);
        energy += a.vx * a.vx + a.vy * a.vy;
      }

      for (i = 0; i < nodeList.length; i++) {
        a = nodeList[i];
        for (j = i + 1; j < nodeList.length; j++) {
          b = nodeList[j];
          dx = b.x - a.x;
          dy = b.y - a.y;
          dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
          minDist = a.r + b.r + COLLIDE_PAD;
          if (dist < minDist) {
            overlap = (minDist - dist) / 2;
            nx = dx / dist;
            ny = dy / dist;
            if (!a.fixed) {
              a.x -= nx * overlap;
              a.y -= ny * overlap;
            }
            if (!b.fixed) {
              b.x += nx * overlap;
              b.y += ny * overlap;
            }
          }
        }
      }

      for (i = 0; i < nodeList.length; i++) placeNode(nodeList[i]);
      syncEdges();

      if (drag || energy > ENERGY_STOP) {
        raf = window.requestAnimationFrame(tick);
      } else {
        running = false;
        raf = 0;
      }
    }

    function svgPoint(clientX, clientY) {
      var rect = svg.getBoundingClientRect();
      if (!rect.width || !rect.height) return { x: 0, y: 0 };
      return {
        x: ((clientX - rect.left) / rect.width) * W,
        y: ((clientY - rect.top) / rect.height) * H
      };
    }

    function onPointerDown(e) {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      var t = e.target;
      if (!t || !t.closest) return;
      var target = t.closest('.gv-node');
      if (!target) return;
      var id = target.getAttribute('data-id');
      var node = nodes[id];
      if (!node) return;
      var p = svgPoint(e.clientX, e.clientY);
      drag = {
        id: id,
        pointerId: e.pointerId,
        ox: p.x - node.x,
        oy: p.y - node.y
      };
      node.fixed = true;
      node.vx = 0;
      node.vy = 0;
      target.classList.add('is-drag');
      stage.classList.add('is-dragging-node');
      try { stage.setPointerCapture(e.pointerId); } catch (err) {}
      kick();
      e.preventDefault();
    }

    function onPointerMove(e) {
      if (!drag || drag.pointerId !== e.pointerId) return;
      var node = nodes[drag.id];
      if (!node) return;
      var p = svgPoint(e.clientX, e.clientY);
      node.x = clamp(p.x - drag.ox, 40, W - 40);
      node.y = clamp(p.y - drag.oy, 40, H - 40);
      node.vx = 0;
      node.vy = 0;
      placeNode(node);
      syncEdges();
    }

    function onPointerUp(e) {
      if (!drag || drag.pointerId !== e.pointerId) return;
      var node = nodes[drag.id];
      if (node) {
        node.fixed = false;
        node.el.classList.remove('is-drag');
      }
      stage.classList.remove('is-dragging-node');
      drag = null;
      kick();
    }

    stage.addEventListener('pointerdown', onPointerDown);
    stage.addEventListener('pointermove', onPointerMove);
    stage.addEventListener('pointerup', onPointerUp);
    stage.addEventListener('pointercancel', onPointerUp);

    syncEdges();
    // Do not auto-run physics on load \u2014 constant SVG attribute writes
    // thrash corvidaehtml's MutationObserver and can blank the embed.
    // Physics starts on drag (kick in onPointerDown / onPointerUp).
    } catch (err) {}
  })();

  /* ---------- 05 Custom Graph physics (dev.md 1:1) ---------- */
  (function initDbGraphMock() {
    try {
    var mock = document.getElementById('dbg-mock');
    var stage = document.getElementById('dbg-stage');
    var svg = document.getElementById('dbg-canvas');
    var viewport = document.getElementById('dbg-viewport');
    var nodesRoot = document.getElementById('dbg-nodes');
    var edgesRoot = document.getElementById('dbg-edges');
    var dataEl = document.getElementById('dbg-data');
    var bonusBtn = document.getElementById('dbg-bonus');
    var edgeSlider = document.getElementById('dbg-edge');
    if (!mock || !stage || !svg || !viewport || !nodesRoot || !edgesRoot || !dataEl) return;

    var DATA = JSON.parse(dataEl.textContent || '{}');
    var W = 900, H = 560, CX = W / 2, CY = H / 2;
    var NS = 'http://www.w3.org/2000/svg';
    var showFunctions = false;
    var LINK_DIST = 420;
    var CHARGE = 4200, LINK_STRENGTH = 0.08, CENTER = 0.0012, RADIAL = 0.045;
    var FRICTION = 0.88, COLLIDE_PAD = 14, MAX_V = 8, ENERGY_STOP = 0.015;
    var reducePhysics = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var nodes = {}, structList = [], funcList = [], structLinks = [], funcLinks = [];
    var drag = null, raf = 0, running = false;
    var panX = 0, panY = 0, scale = 1, panning = false, panStart = null;

    if (edgeSlider) {
      LINK_DIST = Number(edgeSlider.value) || 420;
      edgeSlider.addEventListener('input', function () {
        LINK_DIST = Math.max(40, Math.min(420, Number(edgeSlider.value) || 420));
        kick();
      });
    }

    function setFunctionsVisible(on) {
      showFunctions = !!on;
      mock.classList.toggle('is-functions-off', !showFunctions);
      if (bonusBtn) {
        bonusBtn.classList.toggle('is-active', showFunctions);
        bonusBtn.setAttribute('aria-pressed', showFunctions ? 'true' : 'false');
      }
      placeFunctions();
      syncEdges();
    }

    if (bonusBtn) {
      bonusBtn.addEventListener('click', function () {
        setFunctionsVisible(!showFunctions);
      });
    }

    function svgEl(name) { return document.createElementNS(NS, name); }

    function kindFrom(k) {
      if (k === 'd') return 'folder';
      if (k === 'fn') return 'function';
      return 'file';
    }

    function radiusFor(kind) {
      if (kind === 'folder') return 10;
      if (kind === 'function') return 4;
      return 8;
    }

    // Build structural nodes
    var rawNodes = DATA.n || [];
    var rootId = DATA.r || (rawNodes[0] && rawNodes[0].id) || 'src';
    for (var i = 0; i < rawNodes.length; i++) {
      var rn = rawNodes[i];
      var kind = kindFrom(rn.k);
      var isRoot = rn.id === rootId;
      var node = {
        id: rn.id,
        kind: kind,
        label: rn.l,
        parentId: rn.p || null,
        x: CX, y: CY,
        vx: 0, vy: 0,
        r: radiusFor(kind),
        mass: kind === 'folder' ? 2.6 : 1.1,
        fixed: isRoot,
        isRoot: isRoot,
        depth: 0,
        el: null, orbitIndex: 0, orbitTotal: 1
      };
      nodes[node.id] = node;
      structList.push(node);
    }

    // Depth + children lists for radial layout
    var childrenOf = {};
    for (i = 0; i < structList.length; i++) {
      var n0 = structList[i];
      if (!n0.parentId) continue;
      if (!childrenOf[n0.parentId]) childrenOf[n0.parentId] = [];
      childrenOf[n0.parentId].push(n0);
    }
    function computeDepth(node) {
      if (node.isRoot || !node.parentId) { node.depth = 0; return 0; }
      var p = nodes[node.parentId];
      if (!p) { node.depth = 1; return 1; }
      node.depth = computeDepth(p) + 1;
      return node.depth;
    }
    for (i = 0; i < structList.length; i++) computeDepth(structList[i]);

    // Place hierarchy outward from root (folders mid, files at the rim)
    function placeTree(parent, baseAngle, sweep) {
      var kids = childrenOf[parent.id] || [];
      if (!kids.length) return;
      var folderKids = [], fileKids = [];
      for (var k = 0; k < kids.length; k++) {
        if (kids[k].kind === 'folder') folderKids.push(kids[k]);
        else fileKids.push(kids[k]);
      }
      var ordered = folderKids.concat(fileKids);
      var step = sweep / Math.max(ordered.length, 1);
      for (k = 0; k < ordered.length; k++) {
        var child = ordered[k];
        var ang = baseAngle - sweep / 2 + step * (k + 0.5);
        var dist = child.depth * (LINK_DIST * 0.92);
        if (child.kind === 'file') dist += LINK_DIST * 0.35;
        child.x = CX + Math.cos(ang) * dist;
        child.y = CY + Math.sin(ang) * dist;
        var childSweep = Math.min(step * 0.95, Math.PI * 0.9);
        placeTree(child, ang, childSweep);
      }
    }
    var rootNode = nodes[rootId];
    if (rootNode) {
      rootNode.x = CX; rootNode.y = CY;
      placeTree(rootNode, -Math.PI / 2, Math.PI * 2);
    }

    var rawEdges = DATA.e || [];
    for (i = 0; i < rawEdges.length; i++) {
      var se = rawEdges[i];
      var a = nodes[se[0]], b = nodes[se[1]];
      if (!a || !b) continue;
      var line = svgEl('line');
      line.setAttribute('class', 'dbg-edge');
      edgesRoot.appendChild(line);
      structLinks.push({ el: line, source: a, target: b });
    }

    // Build function nodes from parsed names
    var rawFns = DATA.f || [];
    for (i = 0; i < rawFns.length; i++) {
      var fileId = rawFns[i][0];
      var names = rawFns[i][1] || [];
      var parent = nodes[fileId];
      if (!parent) continue;
      for (var j = 0; j < names.length; j++) {
        var fname = names[j];
        var fid = fileId + '#fn:' + fname + '@' + j;
        var fn = {
          id: fid,
          kind: 'function',
          label: fname,
          parentId: fileId,
          x: parent.x, y: parent.y,
          vx: 0, vy: 0,
          r: 4,
          mass: 0.5,
          fixed: false,
          isRoot: false,
          el: null,
          orbitIndex: j,
          orbitTotal: names.length
        };
        nodes[fid] = fn;
        funcList.push(fn);
        var fline = svgEl('line');
        fline.setAttribute('class', 'dbg-edge is-function');
        edgesRoot.appendChild(fline);
        funcLinks.push({ el: fline, source: parent, target: fn });
      }
    }

    function buildNodeEl(node) {
      var g = svgEl('g');
      g.setAttribute('class', 'dbg-node is-' + node.kind);
      g.setAttribute('data-id', node.id);
      var circle = svgEl('circle');
      circle.setAttribute('class', 'dbg-node-circle');
      circle.setAttribute('r', String(node.r));
      var text = svgEl('text');
      text.setAttribute('class', 'dbg-node-label');
      text.setAttribute('x', String(node.r + 4));
      text.setAttribute('y', '4');
      text.textContent = node.label;
      g.appendChild(circle);
      g.appendChild(text);
      if (node.kind === 'function') {
        var title = svgEl('title');
        title.textContent = node.label;
        g.appendChild(title);
      }
      nodesRoot.appendChild(g);
      node.el = g;
      placeNode(node);
    }

    for (i = 0; i < structList.length; i++) buildNodeEl(structList[i]);
    for (i = 0; i < funcList.length; i++) buildNodeEl(funcList[i]);

    function placeNode(node) {
      if (node.el) node.el.setAttribute('transform', 'translate(' + node.x + ',' + node.y + ')');
    }

    function placeFunctions() {
      for (var i = 0; i < funcList.length; i++) {
        var fn = funcList[i];
        var parent = nodes[fn.parentId];
        if (!parent) continue;
        var n = Math.max(fn.orbitTotal, 1);
        var orbitR = 28 + Math.min(n, 24) * 2.2;
        var angle = (fn.orbitIndex / n) * Math.PI * 2;
        fn.x = parent.x + Math.cos(angle) * orbitR;
        fn.y = parent.y + Math.sin(angle) * orbitR;
        placeNode(fn);
      }
    }

    function syncEdges() {
      var i, link;
      for (i = 0; i < structLinks.length; i++) {
        link = structLinks[i];
        link.el.setAttribute('x1', String(link.source.x));
        link.el.setAttribute('y1', String(link.source.y));
        link.el.setAttribute('x2', String(link.target.x));
        link.el.setAttribute('y2', String(link.target.y));
      }
      for (i = 0; i < funcLinks.length; i++) {
        link = funcLinks[i];
        link.el.setAttribute('x1', String(link.source.x));
        link.el.setAttribute('y1', String(link.source.y));
        link.el.setAttribute('x2', String(link.target.x));
        link.el.setAttribute('y2', String(link.target.y));
      }
    }

    function applyTransform() {
      viewport.setAttribute('transform', 'translate(' + panX + ',' + panY + ') scale(' + scale + ')');
    }

    function centerOnRoot() {
      var root = nodes[rootId];
      if (!root) return;
      panX = W / 2 - root.x * scale;
      panY = H / 2 - root.y * scale;
      applyTransform();
    }

    function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

    function kick() {
      if (reducePhysics || running) return;
      running = true;
      raf = window.requestAnimationFrame(tick);
    }

    function tick() {
      var i, j, a, b, dx, dy, dist, dist2, f, nx, ny, minDist, overlap, energy = 0;

      for (i = 0; i < structList.length; i++) {
        a = structList[i];
        for (j = i + 1; j < structList.length; j++) {
          b = structList[j];
          dx = b.x - a.x; dy = b.y - a.y;
          dist2 = dx * dx + dy * dy;
          if (dist2 < 0.01) {
            dx = (Math.random() - 0.5) * 0.4;
            dy = (Math.random() - 0.5) * 0.4;
            dist2 = dx * dx + dy * dy;
          }
          f = CHARGE / dist2;
          dist = Math.sqrt(dist2);
          nx = dx / dist; ny = dy / dist;
          if (!a.fixed) { a.vx -= (nx * f) / a.mass; a.vy -= (ny * f) / a.mass; }
          if (!b.fixed) { b.vx += (nx * f) / b.mass; b.vy += (ny * f) / b.mass; }
        }
      }

      for (i = 0; i < structLinks.length; i++) {
        a = structLinks[i].source; b = structLinks[i].target;
        dx = b.x - a.x; dy = b.y - a.y;
        dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
        // Files hang farther out than folders
        var want = LINK_DIST;
        if (b.kind === 'file') want = LINK_DIST * 1.15;
        else if (a.kind === 'folder' && b.kind === 'folder') want = LINK_DIST * 0.95;
        f = (dist - want) * LINK_STRENGTH;
        nx = (dx / dist) * f; ny = (dy / dist) * f;
        if (!a.fixed) { a.vx += nx / a.mass; a.vy += ny / a.mass; }
        if (!b.fixed) { b.vx -= nx / b.mass; b.vy -= ny / b.mass; }
      }

      // Pull deeper nodes (esp. files) outward to the rim
      for (i = 0; i < structList.length; i++) {
        a = structList[i];
        if (a.fixed) continue;
        dx = a.x - CX; dy = a.y - CY;
        dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
        var targetR = Math.max(1, a.depth) * LINK_DIST * 0.92;
        if (a.kind === 'file') targetR += LINK_DIST * 0.4;
        f = (targetR - dist) * RADIAL;
        // mild center only for shallow folders
        if (a.kind === 'folder' && a.depth <= 1) {
          a.vx += (CX - a.x) * CENTER;
          a.vy += (CY - a.y) * CENTER;
        }
        nx = dx / dist; ny = dy / dist;
        a.vx += nx * f;
        a.vy += ny * f;
      }

      for (i = 0; i < structList.length; i++) {
        a = structList[i];
        if (a.fixed) { a.vx = 0; a.vy = 0; continue; }
        a.vx *= FRICTION; a.vy *= FRICTION;
        a.vx = clamp(a.vx, -MAX_V, MAX_V);
        a.vy = clamp(a.vy, -MAX_V, MAX_V);
        a.x += a.vx; a.y += a.vy;
        energy += a.vx * a.vx + a.vy * a.vy;
      }

      for (i = 0; i < structList.length; i++) {
        a = structList[i];
        for (j = i + 1; j < structList.length; j++) {
          b = structList[j];
          dx = b.x - a.x; dy = b.y - a.y;
          dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
          minDist = a.r + b.r + COLLIDE_PAD;
          if (dist < minDist) {
            overlap = (minDist - dist) / 2;
            nx = dx / dist; ny = dy / dist;
            if (!a.fixed) { a.x -= nx * overlap; a.y -= ny * overlap; }
            if (!b.fixed) { b.x += nx * overlap; b.y += ny * overlap; }
          }
        }
      }

      for (i = 0; i < structList.length; i++) placeNode(structList[i]);
      placeFunctions();
      syncEdges();

      if (drag || energy > ENERGY_STOP) raf = window.requestAnimationFrame(tick);
      else { running = false; raf = 0; }
    }

    function clientToWorld(clientX, clientY) {
      var rect = svg.getBoundingClientRect();
      if (!rect.width || !rect.height) return { x: 0, y: 0 };
      var sx = ((clientX - rect.left) / rect.width) * W;
      var sy = ((clientY - rect.top) / rect.height) * H;
      return { x: (sx - panX) / scale, y: (sy - panY) / scale };
    }

    function onPointerDown(e) {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      var t = e.target;
      if (!t || !t.closest) return;
      var target = t.closest('.dbg-node');
      if (target && !target.classList.contains('is-function')) {
        var node = nodes[target.getAttribute('data-id')];
        if (!node || node.isRoot) return;
        var p = clientToWorld(e.clientX, e.clientY);
        drag = { id: node.id, pointerId: e.pointerId, ox: p.x - node.x, oy: p.y - node.y };
        node.fixed = true; node.vx = 0; node.vy = 0;
        target.classList.add('is-drag');
        stage.classList.add('is-dragging-node');
        try { stage.setPointerCapture(e.pointerId); } catch (err) {}
        kick();
        e.preventDefault();
        return;
      }
      // pan background
      panning = true;
      panStart = { pointerId: e.pointerId, x: e.clientX, y: e.clientY, ox: panX, oy: panY };
      stage.classList.add('is-panning');
      try { stage.setPointerCapture(e.pointerId); } catch (err2) {}
      e.preventDefault();
    }

    function onPointerMove(e) {
      if (drag && drag.pointerId === e.pointerId) {
        var node = nodes[drag.id];
        if (!node) return;
        var p = clientToWorld(e.clientX, e.clientY);
        node.x = p.x - drag.ox;
        node.y = p.y - drag.oy;
        node.vx = 0; node.vy = 0;
        placeNode(node);
        placeFunctions();
        syncEdges();
        return;
      }
      if (panning && panStart && panStart.pointerId === e.pointerId) {
        var rect = svg.getBoundingClientRect();
        var dx = ((e.clientX - panStart.x) / rect.width) * W;
        var dy = ((e.clientY - panStart.y) / rect.height) * H;
        panX = panStart.ox + dx;
        panY = panStart.oy + dy;
        applyTransform();
      }
    }

    function onPointerUp(e) {
      if (drag && drag.pointerId === e.pointerId) {
        var node = nodes[drag.id];
        if (node) {
          if (!node.isRoot) node.fixed = false;
          node.el.classList.remove('is-drag');
        }
        stage.classList.remove('is-dragging-node');
        drag = null;
        kick();
      }
      if (panning && panStart && panStart.pointerId === e.pointerId) {
        panning = false;
        panStart = null;
        stage.classList.remove('is-panning');
      }
    }

    svg.addEventListener('wheel', function (e) {
      e.preventDefault();
      var factor = e.deltaY < 0 ? 1.08 : 0.92;
      var next = Math.min(4, Math.max(0.2, scale * factor));
      if (next === scale) return;
      var root = nodes[rootId];
      var pivotX = root ? root.x : CX;
      var pivotY = root ? root.y : CY;
      var screenX = pivotX * scale + panX;
      var screenY = pivotY * scale + panY;
      scale = next;
      panX = screenX - pivotX * scale;
      panY = screenY - pivotY * scale;
      applyTransform();
    }, { passive: false });

    stage.addEventListener('pointerdown', onPointerDown);
    stage.addEventListener('pointermove', onPointerMove);
    stage.addEventListener('pointerup', onPointerUp);
    stage.addEventListener('pointercancel', onPointerUp);

    setFunctionsVisible(false);
    placeFunctions();
    syncEdges();
    centerOnRoot();
    kick();
    } catch (err) { console.warn('Custom Graph mock failed', err); }
  })();

  /* ---------- 05 Coding Editor timeline ---------- */
  (function initEditorMock() {
    try {
    var codeEl = document.getElementById('ed-code');
    var range = document.getElementById('ed-range');
    var meta = document.getElementById('ed-commit-meta');
    var axisLabel = document.getElementById('ed-axis-label');
    var branchSvg = document.getElementById('ed-branch-svg');
    if (!codeEl || !range || !meta || !axisLabel || !branchSvg) return;

    var commits = [
      {
        hash: 'a1c3e7', branch: 'main', msg: 'init workspace shell',
        lines: [
          { n: 1, t: 'normal', mark: ' ', html: '<span class="cm">// workspace bootstrap</span>' },
          { n: 2, t: 'normal', mark: ' ', html: '<span class="kw">export const</span> ready = <span class="str">false</span>;' }
        ]
      },
      {
        hash: 'b91e09', branch: 'main', msg: 'add schema stub',
        lines: [
          { n: 1, t: 'normal', mark: ' ', html: '<span class="kw">export type</span> NodeId = <span class="str">string</span>;' },
          { n: 2, t: 'add', mark: '+', html: '<span class="kw">export interface</span> Schema { tables: Table[]; }' },
          { n: 3, t: 'normal', mark: ' ', html: '<span class="kw">export const</span> ready = <span class="str">false</span>;' }
        ]
      },
      {
        hash: 'c4f21a', branch: 'main', msg: 'wire graph import',
        lines: [
          { n: 1, t: 'add', mark: '+', html: '<span class="kw">import</span> { buildGraph } <span class="kw">from</span> <span class="str">"./graph"</span>;' },
          { n: 2, t: 'normal', mark: ' ', html: '<span class="kw">export type</span> NodeId = <span class="str">string</span>;' },
          { n: 3, t: 'normal', mark: ' ', html: '<span class="kw">export interface</span> Schema { tables: Table[]; }' },
          { n: 4, t: 'del', mark: '-', html: '<span class="kw">export const</span> ready = <span class="str">false</span>;' },
          { n: 5, t: 'add', mark: '+', html: '<span class="kw">export const</span> ready = <span class="str">true</span>;' }
        ]
      },
      {
        hash: 'd8aa01', branch: 'main', msg: 'stabilize schema API',
        lines: [
          { n: 1, t: 'normal', mark: ' ', html: '<span class="kw">import</span> { buildGraph } <span class="kw">from</span> <span class="str">"./graph"</span>;' },
          { n: 2, t: 'normal', mark: ' ', html: '<span class="kw">export type</span> NodeId = <span class="str">string</span>;' },
          { n: 3, t: 'add', mark: '+', html: '<span class="kw">export function</span> validate(s: Schema) { <span class="kw">return</span> !!s.tables; }' },
          { n: 4, t: 'normal', mark: ' ', html: '<span class="kw">export const</span> ready = <span class="str">true</span>;' }
        ]
      },
      {
        hash: 'e2b910', branch: 'feature/db-graph', msg: 'branch: database graph nodes',
        lines: [
          { n: 1, t: 'normal', mark: ' ', html: '<span class="kw">import</span> { buildGraph } <span class="kw">from</span> <span class="str">"./graph"</span>;' },
          { n: 2, t: 'add', mark: '+', html: '<span class="kw">import</span> { dbNodes } <span class="kw">from</span> <span class="str">"./db-graph"</span>;' },
          { n: 3, t: 'del', mark: '-', html: '<span class="kw">export function</span> validate(s: Schema) { <span class="kw">return</span> !!s.tables; }' },
          { n: 4, t: 'add', mark: '+', html: '<span class="kw">export function</span> validate(s: Schema) { <span class="kw">return</span> dbNodes(s); }' },
          { n: 5, t: 'normal', mark: ' ', html: '<span class="kw">export const</span> ready = <span class="str">true</span>;' }
        ]
      },
      {
        hash: 'f77c0d', branch: 'feature/db-graph', msg: 'open timeline compare axis',
        lines: [
          { n: 1, t: 'normal', mark: ' ', html: '<span class="kw">import</span> { buildGraph } <span class="kw">from</span> <span class="str">"./graph"</span>;' },
          { n: 2, t: 'normal', mark: ' ', html: '<span class="kw">import</span> { dbNodes } <span class="kw">from</span> <span class="str">"./db-graph"</span>;' },
          { n: 3, t: 'add', mark: '+', html: '<span class="kw">export const</span> timeline = { open: <span class="str">true</span> };' },
          { n: 4, t: 'normal', mark: ' ', html: '<span class="kw">export function</span> validate(s: Schema) { <span class="kw">return</span> dbNodes(s); }' },
          { n: 5, t: 'normal', mark: ' ', html: '<span class="kw">export const</span> ready = <span class="str">true</span>;' }
        ]
      }
    ];

    function render(idx) {
      var c = commits[idx] || commits[0];
      meta.innerHTML = '<div><span class="hash">' + c.hash + '</span> \xB7 ' + c.branch + '</div><div class="msg">' + c.msg + '</div>';
      axisLabel.textContent = 'open axis \xB7 ' + c.hash;
      var html = '';
      for (var i = 0; i < c.lines.length; i++) {
        var line = c.lines[i];
        var cls = 'ed-line' + (line.t === 'add' ? ' add' : line.t === 'del' ? ' del' : '');
        html += '<div class="' + cls + '"><span class="num">' + line.n + '</span><span class="mark">' + line.mark + '</span><span class="src">' + line.html + '</span></div>';
      }
      codeEl.innerHTML = html;
      Array.prototype.forEach.call(branchSvg.querySelectorAll('.commit'), function (dot) {
        var on = Number(dot.getAttribute('data-commit')) === idx;
        dot.classList.toggle('is-on', on);
      });
    }

    function setCommit(idx) {
      idx = Math.max(0, Math.min(commits.length - 1, idx));
      range.value = String(idx);
      render(idx);
    }

    range.addEventListener('input', function () {
      setCommit(Number(range.value));
    });
    branchSvg.addEventListener('click', function (e) {
      var t = e.target;
      if (!t || !t.getAttribute) return;
      if (!t.classList.contains('commit')) return;
      setCommit(Number(t.getAttribute('data-commit')));
    });
    setCommit(0);
    } catch (err) {}
  })();

  /* ---------- 06 Neural Network visualization ---------- */
  (function initNeuralMock() {
    try {
    var stepBtn = document.getElementById('nn-step');
    var vectorEl = document.getElementById('nn-vector');
    var epochEl = document.getElementById('nn-epoch');
    var sparkLine = document.getElementById('nn-spark-line');
    var edgesG = document.getElementById('nn-edges');
    var nodesG = document.getElementById('nn-nodes');
    if (!stepBtn || !vectorEl || !epochEl || !sparkLine || !edgesG || !nodesG) return;

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var inputVals = [0.20, 0.80, 0.45];
    var hiddenVals = [0, 0, 0, 0];
    var outputVals = [0, 0];
    var epoch = 12;
    var loss = 0.184;
    var losses = [0.38, 0.34, 0.30, 0.28, 0.22, 0.24, 0.18, 0.16, 0.14, 0.12, 0.11];
    var busy = false;
    var edgeEls = Array.prototype.slice.call(edgesG.querySelectorAll('.nn-edge'));
    var nodeMap = {};
    Array.prototype.forEach.call(nodesG.querySelectorAll('.nn-node-g'), function (g) {
      nodeMap[g.getAttribute('data-id')] = {
        circle: g.querySelector('.nn-node'),
        text: g.querySelector('.nn-val')
      };
    });

    function fmtVec(arr) {
      return '[' + arr.map(function (v) { return v.toFixed(2); }).join(', ') + ']';
    }

    function updateSpark() {
      var pts = [];
      for (var i = 0; i < losses.length; i++) {
        var x = (i / Math.max(1, losses.length - 1)) * 200;
        var y = 42 - losses[i] * 70;
        pts.push(x + ',' + y);
      }
      sparkLine.setAttribute('points', pts.join(' '));
    }

    function setNode(id, v, pulse) {
      var el = nodeMap[id];
      if (!el) return;
      el.text.textContent = v.toFixed(2);
      el.circle.classList.toggle('is-on', v > 0.05);
      el.circle.classList.toggle('is-pulse', !!pulse);
    }

    function clearPulses() {
      edgeEls.forEach(function (e) { e.classList.remove('is-pulse'); });
      Object.keys(nodeMap).forEach(function (id) {
        nodeMap[id].circle.classList.remove('is-pulse');
      });
    }

    function act(x) { return 1 / (1 + Math.exp(-x)); }

    function forward(animate) {
      if (busy) return;
      busy = true;
      stepBtn.disabled = true;
      clearPulses();
      vectorEl.textContent = fmtVec(inputVals);

      var wh = [
        [0.6, 0.4, 0.3, 0.2],
        [0.5, 0.7, 0.45, 0.35],
        [0.25, 0.4, 0.65, 0.55]
      ];
      var wo = [
        [0.55, 0.3],
        [0.7, 0.4],
        [0.35, 0.6],
        [0.25, 0.5]
      ];

      for (var h = 0; h < 4; h++) {
        var sum = -0.5;
        for (var i = 0; i < 3; i++) sum += inputVals[i] * wh[i][h];
        hiddenVals[h] = act(sum);
      }
      for (var o = 0; o < 2; o++) {
        var s2 = -0.35;
        for (var j = 0; j < 4; j++) s2 += hiddenVals[j] * wo[j][o];
        outputVals[o] = act(s2);
      }

      function finish() {
        epoch += 1;
        loss = Math.max(0.04, loss * (0.92 + Math.random() * 0.06));
        losses.push(loss);
        if (losses.length > 12) losses.shift();
        epochEl.textContent = 'epoch ' + epoch + ' \xB7 loss ' + loss.toFixed(3);
        updateSpark();
        clearPulses();
        busy = false;
        stepBtn.disabled = false;
      }

      var idsIn = ['i0', 'i1', 'i2'];
      var idsH = ['h0', 'h1', 'h2', 'h3'];
      var idsO = ['o0', 'o1'];

      if (!animate || reduceMotion) {
        for (var hi = 0; hi < 4; hi++) setNode(idsH[hi], hiddenVals[hi], false);
        for (var oi = 0; oi < 2; oi++) setNode(idsO[oi], outputVals[oi], false);
        finish();
        return;
      }

      var step = 0;
      var timer = window.setInterval(function () {
        clearPulses();
        if (step < 3) {
          setNode(idsIn[step], inputVals[step], true);
          edgeEls.forEach(function (e) {
            if (e.getAttribute('data-from') === idsIn[step]) e.classList.add('is-pulse');
          });
        } else if (step < 7) {
          var hi2 = step - 3;
          setNode(idsH[hi2], hiddenVals[hi2], true);
          edgeEls.forEach(function (e) {
            if (e.getAttribute('data-from') === idsH[hi2]) e.classList.add('is-pulse');
          });
        } else if (step < 9) {
          var oi2 = step - 7;
          setNode(idsO[oi2], outputVals[oi2], true);
        } else {
          window.clearInterval(timer);
          finish();
          return;
        }
        step += 1;
      }, 160);
    }

    updateSpark();
    stepBtn.addEventListener('click', function () { forward(true); });
    } catch (err) {}
  })();

  /* ---------- 07 About: manifesto + orbit slideshow ---------- */
  (function initAboutMotion() {
    try {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var manifesto = document.getElementById('about-manifesto');
    if (manifesto) {
      if (reduceMotion || typeof IntersectionObserver === 'undefined') {
        manifesto.classList.add('is-in');
      } else {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in');
              io.unobserve(entry.target);
            }
          });
        }, { threshold: 0.25 });
        io.observe(manifesto);
      }
    }
    } catch (err) {}
  })();

  (function initAboutOrbit() {
    try {
    var root = document.getElementById('about-orbit');
    var track = document.getElementById('about-orbit-track');
    var dotsWrap = document.getElementById('about-orbit-dots');
    var labelEl = document.getElementById('about-orbit-label');
    var prevBtn = document.getElementById('about-orbit-prev');
    var nextBtn = document.getElementById('about-orbit-next');
    if (!root || !track || !dotsWrap) return;
    if (root.getAttribute('data-ready') === '1') return;
    root.setAttribute('data-ready', '1');

    var slides = track.querySelectorAll('.about-orbit-slide');
    var total = slides.length;
    if (!total) return;
    var index = 0;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    dotsWrap.innerHTML = '';
    for (var i = 0; i < total; i++) {
      (function (n) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'about-orbit-dot' + (n === 0 ? ' is-on' : '');
        b.setAttribute('aria-label', 'Go to slide ' + (n + 1));
        b.setAttribute('role', 'tab');
        b.addEventListener('click', function () { go(n); });
        dotsWrap.appendChild(b);
      })(i);
    }
    var dots = dotsWrap.querySelectorAll('.about-orbit-dot');

    function pad(n) { return (n < 10 ? '0' : '') + n; }

    function go(n) {
      index = (n + total) % total;
      track.style.transform = 'translateX(' + (-index * 25) + '%)';
      for (var d = 0; d < dots.length; d++) {
        if (d === index) dots[d].classList.add('is-on');
        else dots[d].classList.remove('is-on');
      }
      if (labelEl) {
        var name = slides[index].getAttribute('data-label') || '';
        labelEl.innerHTML = '<strong>' + pad(index + 1) + '</strong> \xB7 ' + name;
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { go(index - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { go(index + 1); });

    var startX = 0;
    var dragging = false;
    root.addEventListener('touchstart', function (e) {
      if (!e.touches || !e.touches.length) return;
      dragging = true;
      startX = e.touches[0].clientX;
    }, { passive: true });
    root.addEventListener('touchend', function (e) {
      if (!dragging) return;
      dragging = false;
      var endX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : startX;
      var dx = endX - startX;
      if (Math.abs(dx) < 40) return;
      if (dx < 0) go(index + 1);
      else go(index - 1);
    }, { passive: true });

    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); }
    });
    root.setAttribute('tabindex', '0');

    if (reduceMotion) track.style.transition = 'none';
    go(0);
    } catch (err) {}
  })();
})();
<\/script>

</body>
</html>
\`\`\`
`;function qr(){return $r}async function Vt(o){let t=qr(),e=o.vault.getFileByPath(he);if(e)return await o.vault.read(e)!==t&&await o.vault.modify(e,t),e;try{return await o.vault.create(he,t)}catch{return o.vault.getFileByPath(he)}}async function Ce(o,t){let e=await Vt(o);if(!e){new _t.Notice(d("settings.tips.notice.error"));return}await o.workspace.getLeaf("tab").openFile(e),new _t.Notice(d("settings.tips.notice.opened"))}var Yr="M12 3c-1.2 1.8-1.6 3.4-1.5 5.1-.9-.4-1.7-.5-2.6-.3-1.4.3-2.5 1.3-3.1 2.6-.4.8-.5 1.7-.3 2.6.3 1.3 1.2 2.4 2.5 2.9-.7.9-1 2-1 3.2 0 .4.3.7.7.7h.1c.3 0 .6-.2.7-.5.3-1 .8-1.8 1.6-2.4.5 1.4 1.5 2.5 2.9 3.1.3.1.7 0 .8-.3.1-.3 0-.7-.3-.8-1.1-.5-1.9-1.4-2.2-2.6 1.1.2 2.2 0 3.1-.6.9-.6 1.5-1.5 1.7-2.6.6.5 1.4.8 2.2.8.4 0 .7-.3.7-.7 0-.9-.3-1.7-.8-2.4.9-.3 1.6-1 2-1.9.2-.4 0-.9-.4-1.1-.4-.2-.9 0-1.1.4-.3.6-.8 1.1-1.5 1.3-.1-1.2-.6-2.3-1.5-3.1C13.6 4.6 12.9 3.7 12 3z";function Kr(o){o.empty(),o.addClass("corvidae-crow-icon-host"),o.createSvg("svg",{cls:"corvidae-crow-icon",attr:{viewBox:"0 0 24 24",width:"1em",height:"1em","aria-hidden":"true",focusable:"false"}}).createSvg("path",{attr:{d:Yr,fill:"currentColor"}})}var la='<svg class="corvidae-crow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false"><path fill="currentColor" d="'+Yr+'"/></svg>';function yo(o){return Math.max(2,o)}function Xr(o){let t=yo(o);return t*145+(t-1)*10}var zt=2,Wt=3,ue=24,O=1,jt=["empty","graph","note","browser","terminal","ticket"];var k=require("obsidian");var lt=require("obsidian");function S(o){return o!==null&&typeof o=="object"&&!Array.isArray(o)}function Zr(o){let t=o.trim().replace(/^#/,"");return/^[0-9a-fA-F]{6}$/.test(t)?parseInt(t,16):null}function Pe(o){if(typeof o=="number"&&Number.isFinite(o))return`#${o.toString(16).padStart(6,"0")}`;if(typeof o!="string")return null;let t=o.trim();if(!t)return null;let r=(t.startsWith("#")?t:`#${t}`).replace("#","");return/^[0-9a-fA-F]{6}$/.test(r)?`#${r.toLowerCase()}`:null}function Jr(o,t,e){if(o==null||o==="")return null;let r=typeof o=="number"?o:parseFloat(String(o));return isNaN(r)?null:Math.min(e,Math.max(t,r))}function z(o,t){let e=o?.aliases;if(Array.isArray(e)&&e.length>0){let r=e[0];if(r!=null&&String(r).trim())return String(r).trim()}return typeof e=="string"&&e.trim()?e.trim():t}function re(o,t){let e=o.metadataCache.getFileCache(t)?.frontmatter,r=z(e,t.basename);return r===t.basename?t.path:r}var fe=class extends lt.AbstractInputSuggest{constructor(e,r,s){super(e,r);this.onPick=s;this.textInputEl=r,this.limit=20}getSuggestions(e){let r=this.app.vault.getMarkdownFiles(),s=e.trim();if(!s)return[...r].sort((n,l)=>n.path.localeCompare(l.path)).slice(0,this.limit);let i=(0,lt.prepareFuzzySearch)(s),a=[];for(let n of r){let l=this.app.metadataCache.getFileCache(n)?.frontmatter,u=`${z(l,n.basename)} ${n.basename} ${n.path}`,f=i(u);f&&a.push({file:n,score:f.score})}return a.sort((n,l)=>l.score-n.score).slice(0,this.limit).map(n=>n.file)}renderSuggestion(e,r){let s=re(this.app,e);if(s===e.path){r.setText(e.path);return}r.empty(),r.createDiv({cls:"corvidae-note-suggest-title",text:s}),r.createDiv({cls:"corvidae-note-suggest-path",text:e.path})}selectSuggestion(e,r){this.setValue(re(this.app,e)),this.textInputEl.dataset.notePath=e.path,this.onPick(e),this.close()}};var dt=require("obsidian"),Qr="terminal:terminal",es="corvidae-box-terminal-workspace",ko=new Set(["integrated","developerConsole","emulator"]);function ts(o){return o.plugins}function wo(o){return ts(o).getPlugin("terminal")?.settings?.value??null}function Eo(o){let t=o.platforms;return t?dt.Platform.isMacOS?t.darwin!==!1:dt.Platform.isLinux?t.linux!==!1:dt.Platform.isWin?t.win32!==!1:!0:!0}function To(o){let t=o.type??"invalid";return ko.has(t)?Eo(o):!1}function Ut(o){let t=ts(o);return t.enabledPlugins.has("terminal")?t.getPlugin("terminal")!==null:!1}function J(o){if(!Ut(o))return null;let t=wo(o),e=t?.defaultProfile;if(!e)return null;let r=t?.profiles?.[e];return!r||!To(r)?null:{profileSourceId:e,profile:r}}function Me(o,t,e=""){return{type:Qr,state:{[Qr]:{profile:t,profileSourceId:o,cwd:null,serial:null,focus:!1,userTitle:e}},active:!1}}var rs="corvidae-box-browser-workspace",$t="webviewer",So="webviewer";function W(o){let t=o.internalPlugins;return t&&(t.getEnabledPluginById($t)||t.config?.[$t]===!0)?!0:o.plugins.enabledPlugins.has($t)}function B(o){let t=o.trim();return t?/^https?:\/\//i.test(t)?t:`https://${t}`:null}function Fe(o){return{type:So,state:{url:o,navigate:!0},active:!1}}var ge=class extends k.Modal{constructor(e,r,s){super(e);this.plugin=r;this.box=s;this.noteSettingEl=null;this.linkSettingEl=null;this.ticketProjectSettingEl=null;this.ticketDisplayModeSettingEl=null;this.noteInputEl=null;this.linkInputEl=null;this.noteSuggest=null;this.linkPreviewTimer=null;this.titleValue=s?.title??"",this.typeValue=s?.type??"empty",this.notePathValue=s?.notePath??"",this.linkValue=s?.link??"",this.ticketProjectIdValue=s?.ticketProjectId??"",this.ticketDisplayModeValue=s?.ticketDisplayMode??"last"}get isEditMode(){return this.box!==void 0}onOpen(){this.modalEl.addClass("corvidae-box-modal");let{contentEl:e,titleEl:r}=this;e.empty(),r.setText(this.isEditMode?d("dashboard.box.modal.editTitle"):d("dashboard.box.modal.title")),new k.Setting(e).setName(d("dashboard.box.modal.boxTitle")).addText(h=>{h.setValue(this.titleValue),h.setPlaceholder(d("dashboard.box.modal.boxTitle")),h.onChange(p=>{this.titleValue=p}),h.inputEl.addEventListener("keydown",p=>{p.key==="Enter"&&this.typeValue!=="note"&&this.typeValue!=="browser"&&(p.preventDefault(),this.handleSave())}),window.setTimeout(()=>h.inputEl.focus(),0)}),new k.Setting(e).setName(d("dashboard.box.modal.type")).addDropdown(h=>{for(let p of jt)p==="terminal"&&!Ut(this.app)||h.addOption(p,d(`dashboard.box.type.${p}`));h.setValue(this.typeValue),h.onChange(p=>{this.typeValue=p,this.syncTypeSettingVisibility(),this.scheduleBrowserLinkPreview()})}).settingEl.addClass("corvidae-box-type-setting");let i=new k.Setting(e).setName(d("dashboard.box.modal.note")).setDesc(d("dashboard.box.modal.noteDesc")).addText(h=>{if(this.noteInputEl=h.inputEl,this.noteInputEl.placeholder=d("dashboard.box.modal.notePlaceholder"),this.noteInputEl.dataset.notePath=this.notePathValue,this.notePathValue){let p=this.app.vault.getFileByPath(this.notePathValue);p?h.setValue(re(this.app,p)):h.setValue(this.notePathValue)}h.onChange(p=>{p.trim()||(this.notePathValue="",this.noteInputEl.dataset.notePath="")}),this.noteSuggest=new fe(this.app,this.noteInputEl,p=>{this.notePathValue=p.path,this.noteInputEl.dataset.notePath=p.path})});this.noteSettingEl=i.settingEl,this.noteSettingEl.addClass("corvidae-box-note-setting");let a=new k.Setting(e).setName(d("dashboard.box.modal.link")).setDesc(d("dashboard.box.modal.linkDesc")).addText(h=>{this.linkInputEl=h.inputEl,this.linkInputEl.placeholder=d("dashboard.box.modal.linkPlaceholder"),h.setValue(this.linkValue),h.onChange(p=>{this.linkValue=p,this.scheduleBrowserLinkPreview()})});this.linkSettingEl=a.settingEl,this.linkSettingEl.addClass("corvidae-box-link-setting");let n=new k.Setting(e).setName(d("dashboard.box.modal.ticketProject")).setDesc(d("dashboard.box.modal.ticketProjectDesc")).addDropdown(h=>{h.addOption("",d("dashboard.box.modal.ticketProjectPlaceholder"));for(let p of this.plugin.settings.ticketProjects){let v=p.name.trim()||d("tickets.unnamedProject");h.addOption(p.id,v)}h.setValue(this.ticketProjectIdValue),h.onChange(p=>{this.ticketProjectIdValue=p})});this.ticketProjectSettingEl=n.settingEl,this.ticketProjectSettingEl.addClass("corvidae-box-ticket-project-setting");let l=new k.Setting(e).setName(d("dashboard.box.modal.ticketDisplayMode")).addDropdown(h=>{h.addOption("last",d("dashboard.box.modal.ticketDisplayMode.last")).addOption("all",d("dashboard.box.modal.ticketDisplayMode.all")),h.setValue(this.ticketDisplayModeValue),h.onChange(p=>{this.ticketDisplayModeValue=p==="all"?"all":"last"})});this.ticketDisplayModeSettingEl=l.settingEl,this.ticketDisplayModeSettingEl.addClass("corvidae-box-ticket-display-setting"),this.syncTypeSettingVisibility();let c=e.createDiv({cls:"corvidae-dashboard-modal-actions"});this.isEditMode&&c.createEl("button",{cls:"corvidae-dashboard-modal-delete",text:d("dashboard.box.modal.delete")}).addEventListener("click",()=>{this.handleDelete()});let u=c.createDiv({cls:"corvidae-dashboard-modal-actions-right"});u.createEl("button",{text:d("dashboard.box.modal.cancel")}).addEventListener("click",()=>this.close()),u.createEl("button",{cls:"mod-cta",text:d("dashboard.box.modal.save")}).addEventListener("click",()=>{this.handleSave()})}onClose(){this.linkPreviewTimer!==null&&(window.clearTimeout(this.linkPreviewTimer),this.linkPreviewTimer=null),this.noteSuggest=null,this.noteInputEl=null,this.linkInputEl=null,this.noteSettingEl=null,this.linkSettingEl=null,this.ticketProjectSettingEl=null,this.ticketDisplayModeSettingEl=null,this.modalEl.removeClass("corvidae-box-modal"),this.contentEl.empty()}syncTypeSettingVisibility(){this.noteSettingEl&&this.noteSettingEl.toggleClass("is-hidden",this.typeValue!=="note"),this.linkSettingEl&&this.linkSettingEl.toggleClass("is-hidden",this.typeValue!=="browser"),this.ticketProjectSettingEl&&this.ticketProjectSettingEl.toggleClass("is-hidden",this.typeValue!=="ticket"),this.ticketDisplayModeSettingEl&&this.ticketDisplayModeSettingEl.toggleClass("is-hidden",this.typeValue!=="ticket")}scheduleBrowserLinkPreview(){!this.isEditMode||!this.box||this.typeValue!=="browser"||(this.linkPreviewTimer!==null&&window.clearTimeout(this.linkPreviewTimer),this.linkPreviewTimer=window.setTimeout(()=>{this.linkPreviewTimer=null;let e=B(this.linkValue);!e||!W(this.app)||this.plugin.previewBrowserBoxLink(this.box.id,e)},350))}resolveNotePath(){let e=this.noteInputEl?.dataset.notePath?.trim();if(e)return e;let r=this.notePathValue.trim();if(!r)return"";let s=this.app.vault.getFileByPath(r);return s?s.path:this.app.vault.getMarkdownFiles().find(a=>a.path===r||a.basename===r)?.path??r}async handleSave(){let e=this.titleValue.trim();if(!e){new k.Notice(d("dashboard.box.error.titleRequired"));return}let r=this.typeValue==="note"?this.resolveNotePath():void 0;if(this.typeValue==="note"&&(!r||!this.app.vault.getFileByPath(r))){new k.Notice(d("dashboard.box.error.noteRequired"));return}let s;if(this.typeValue==="browser"){let n=B(this.linkValue);if(!n){new k.Notice(d("dashboard.box.error.linkRequired"));return}if(!W(this.app)){new k.Notice(d("dashboard.box.error.webviewerUnavailable"));return}s=n}if(this.typeValue==="terminal"&&!J(this.app)){new k.Notice(d("dashboard.box.error.terminalUnavailable"));return}let i,a;if(this.typeValue==="ticket"){if(!this.ticketProjectIdValue){new k.Notice(d("dashboard.box.error.ticketProjectRequired"));return}let l=this.plugin.settings.ticketProjects.find(c=>c.id===this.ticketProjectIdValue)?.developmentLogPath?.trim();if(!l||!this.app.vault.getFileByPath(l)){new k.Notice(d("dashboard.box.error.ticketLogMissing"));return}i=this.ticketProjectIdValue,a=this.ticketDisplayModeValue}if(this.isEditMode&&this.box){if(!(await this.plugin.dashboardBoxStore.updateBox(this.box.id,{title:e,type:this.typeValue,notePath:r,link:s,ticketProjectId:i,ticketDisplayMode:a})).ok)return}else if(!(await this.plugin.dashboardBoxStore.addBox({title:e,type:this.typeValue,notePath:r,link:s,ticketProjectId:i,ticketDisplayMode:a,cols:zt,rows:Wt})).ok){new k.Notice(d("dashboard.box.error.noSpace"));return}this.plugin.refreshDashboardViews(),this.plugin.resyncDashboardBrowserEmbeds(),this.plugin.resyncDashboardTicketEmbeds(),this.close()}async handleDelete(){!this.box||!(await this.plugin.dashboardBoxStore.deleteBox(this.box.id)).ok||(this.plugin.refreshDashboardViews(),this.close())}};var w="corvidae-dashboard",j=class extends me.ItemView{constructor(e,r,s){super(e);this.mode="full";this.selectedBoxId=null;this.moveMode=!1;this.plugin=r,this.getSettings=s}getViewType(){return w}getDisplayText(){return d("dashboard.viewTitle")}getIcon(){return"layout-dashboard"}getState(){return{mode:this.mode}}async setState(e,r){let s=e;this.mode=s?.mode==="bar"?"bar":"full",this.applyModeClasses(),this.render()}async onOpen(){let e=this.leaf.getViewState().state;this.mode=e?.mode==="bar"?"bar":"full";let{containerEl:r}=this;r.empty(),r.addClass("corvidae-dashboard-view"),this.applyModeClasses(),this.dashboardEl=r.createDiv({cls:"corvidae-dashboard"}),this.registerDomEvent(this.dashboardEl,"contextmenu",s=>{s.target.closest(".corvidae-dashboard-toolbar")||(s.preventDefault(),this.showDashboardMenu(s))}),this.render()}async onClose(){this.selectedBoxId=null,this.moveMode=!1,this.plugin.dashboardGraphBoxEmbed.detachAll(),this.plugin.dashboardNoteBoxEmbed.detachAll(),this.plugin.dashboardTerminalBoxEmbed.detachAll(),this.plugin.dashboardTicketBoxEmbed.detachAll();let e=this.containerEl.closest(".workspace-tabs");e?.removeClass("corvidae-dashboard-bar-tabs"),e?.closest(".workspace-split.mod-horizontal, .workspace-split.mod-horizontal-split")?.removeClass("corvidae-dashboard-bar-split"),this.plugin.dashboardLayoutManager.cleanupBarSplitClasses(),this.dashboardEl?.empty()}refresh(){this.pruneSelection(),this.render()}isBarMode(){return this.mode==="bar"}pruneSelection(){this.selectedBoxId&&(this.plugin.dashboardBoxStore.getBoxById(this.selectedBoxId)||(this.selectedBoxId=null,this.moveMode=!1))}selectBox(e){this.selectedBoxId===e?this.selectedBoxId=null:this.selectedBoxId=e,this.syncSelectionUi()}syncSelectionUi(){!this.dashboardEl||this.mode!=="full"||(this.dashboardEl.querySelectorAll(".corvidae-dashboard-box").forEach(e=>{e.classList.toggle("is-selected",e.dataset.boxId===this.selectedBoxId)}),this.syncMoveSlots())}syncMoveSlots(){let e=this.dashboardEl.querySelector(".corvidae-dashboard-box-grid");e?.instanceOf(HTMLElement)&&(e.querySelectorAll(".corvidae-dashboard-move-slot").forEach(r=>{r.remove()}),this.moveMode&&this.selectedBoxId&&this.renderMoveSlots(e,this.selectedBoxId))}applyModeClasses(){this.containerEl.toggleClass("corvidae-dashboard-view--full",this.mode==="full"),this.containerEl.toggleClass("corvidae-dashboard-view--bar",this.mode==="bar"),this.applyBarTabChrome(),this.plugin.dashboardLayoutManager.syncTabStripChrome()}applyBarTabChrome(){let e=this.containerEl.closest(".workspace-tabs");if(!e?.instanceOf(HTMLElement))return;let r=this.mode==="bar";e.toggleClass("corvidae-dashboard-bar-tabs",r);let s=e.closest(".workspace-split.mod-horizontal, .workspace-split.mod-horizontal-split");s?.instanceOf(HTMLElement)&&s.toggleClass("corvidae-dashboard-bar-split",r),this.plugin.dashboardLayoutManager.cleanupBarSplitClasses()}render(){if(this.dashboardEl){if(this.dashboardEl.empty(),this.mode==="bar"){this.renderBarMode();return}this.renderToolbar(this.dashboardEl),this.renderBoxGrid(this.dashboardEl)}}renderBarMode(){let r=this.dashboardEl.createDiv({cls:"corvidae-dashboard-bar-scroll"}).createDiv({cls:"corvidae-dashboard-bar-track"}),s=this.plugin.dashboardBoxStore.getBoxes();if(s.length===0){r.createDiv({cls:"corvidae-dashboard-bar-empty",text:d("dashboard.box.emptyHint")});return}let i=[...s].sort((a,n)=>a.row-n.row||a.col-n.col||a.title.localeCompare(n.title));for(let a of i)this.renderBarBox(r,a);this.syncGraphBoxes(s),this.syncNoteBoxes(s),this.syncBrowserBoxes(s),this.syncTerminalBoxes(s),this.syncTicketBoxes(s),window.requestAnimationFrame(()=>{this.resyncGraphEmbeds(),this.resyncNoteEmbeds(),this.resyncBrowserEmbeds(),this.resyncTerminalEmbeds(),this.resyncTicketEmbeds()})}renderBarBox(e,r){let s=e.createDiv({cls:"corvidae-dashboard-box corvidae-dashboard-box--bar"}),i=Xr(r.cols);s.style.width=`${i}px`,s.style.minWidth=`${i}px`,s.style.maxWidth=`${i}px`,s.style.flex=`0 0 ${i}px`,s.dataset.boxId=r.id,s.dataset.barCols=String(Math.max(2,r.cols));let a=s.createEl("button",{cls:"corvidae-dashboard-box-title",text:r.title});a.type="button",a.addEventListener("click",l=>{l.stopPropagation(),this.openBoxInTab(r)});let n=s.createDiv({cls:"corvidae-dashboard-box-body"});if(r.type==="graph"){n.addClass("corvidae-dashboard-box-body--graph");let l=n.createDiv({cls:"corvidae-box-graph-host"});l.dataset.graphHost=r.id}else if(r.type==="note"){n.addClass("corvidae-dashboard-box-body--note");let l=n.createDiv({cls:"corvidae-box-note-host"});l.dataset.noteHost=r.id}else if(r.type==="browser"){n.addClass("corvidae-dashboard-box-body--browser");let l=n.createDiv({cls:"corvidae-box-browser-host"});l.dataset.browserHost=r.id}else if(r.type==="terminal"){n.addClass("corvidae-dashboard-box-body--terminal");let l=n.createDiv({cls:"corvidae-box-terminal-host"});l.dataset.terminalHost=r.id}else if(r.type==="ticket"){n.addClass("corvidae-dashboard-box-body--ticket");let l=n.createDiv({cls:"corvidae-box-ticket-host"});l.dataset.ticketHost=r.id}}renderToolbar(e){let r=e.createDiv({cls:"corvidae-dashboard-toolbar"});r.createEl("h1",{cls:"corvidae-dashboard-title",text:d("dashboard.title")});let i=r.createDiv({cls:"corvidae-dashboard-toolbar-actions"}).createSpan({cls:"corvidae-dashboard-crow-link"});Kr(i),i.setAttribute("role","button"),i.setAttribute("tabindex","0"),i.setAttribute("aria-label",d("dashboard.crow.link"));let a=()=>{Ce(this.app,this.plugin)};i.addEventListener("click",a),i.addEventListener("keydown",n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),a())})}showDashboardMenu(e){let r=this.plugin.dashboardBoxStore.getBoxes().length>0,s=this.selectedBoxId!==null,i=new me.Menu;i.addItem(l=>{l.setTitle(d("dashboard.box.create")).onClick(()=>{new ge(this.app,this.plugin).open()})}),i.addItem(l=>{l.setTitle(d("dashboard.box.move")),r||l.setDisabled(!0),l.onClick(()=>{r&&(this.moveMode=!this.moveMode,this.render())})}),i.addItem(l=>{l.setTitle(d("dashboard.box.edit")),s||l.setDisabled(!0),l.onClick(()=>{if(!this.selectedBoxId)return;let c=this.plugin.dashboardBoxStore.getBoxById(this.selectedBoxId);c&&new ge(this.app,this.plugin,c).open()})});let a=this.selectedBoxId?this.plugin.dashboardBoxStore.getBoxById(this.selectedBoxId):null,n=a?this.canOpenBoxInTab(a):!1;i.addItem(l=>{l.setTitle(d("dashboard.box.openTab")),n||l.setDisabled(!0),l.onClick(()=>{this.openSelectedBoxInTab()})}),i.showAtMouseEvent(e)}canOpenBoxInTab(e){if(e.type==="graph")return!0;if(e.type==="note")return!!(e.notePath&&this.app.vault.getFileByPath(e.notePath));if(e.type==="browser")return W(this.app)&&!!B(e.link??"");if(e.type==="terminal")return J(this.app)!==null;if(e.type==="ticket"){let r=e.ticketProjectId;if(!r)return!1;let s=this.plugin.dashboardTicketBoxEmbed.resolveDevelopmentLogPath(r);return!!(s&&this.app.vault.getFileByPath(s))}return!1}async openSelectedBoxInTab(){if(!this.selectedBoxId)return;let e=this.plugin.dashboardBoxStore.getBoxById(this.selectedBoxId);if(!(!e||!this.canOpenBoxInTab(e))){if(e.type==="note"&&e.notePath){await this.app.workspace.openLinkText(e.notePath,"",!1,{active:!0});return}if(e.type==="graph"){await this.app.workspace.getLeaf(!1).setViewState({type:"graph",state:{},active:!0});return}if(e.type==="browser"&&e.link){let r=B(e.link);if(!r||!W(this.app))return;await this.app.workspace.getLeaf(!1).setViewState({...Fe(r),active:!0},{focus:!0});return}if(e.type==="terminal"){let r=J(this.app);if(!r)return;await this.app.workspace.getLeaf(!1).setViewState({...Me(r.profileSourceId,r.profile,e.title),active:!0},{focus:!0});return}if(e.type==="ticket"&&e.ticketProjectId){let r=this.plugin.dashboardTicketBoxEmbed.resolveDevelopmentLogPath(e.ticketProjectId);if(!r)return;await this.app.workspace.openLinkText(r,"",!1,{active:!0})}}}renderBoxGrid(e){let r=this.plugin.dashboardBoxStore.getBoxes(),s=e.createDiv({cls:"corvidae-dashboard-box-grid"});if(this.moveMode&&s.addClass("is-move-mode"),r.length===0){s.createDiv({cls:"corvidae-dashboard-box-empty",text:d("dashboard.box.emptyHint")});return}this.moveMode&&this.selectedBoxId&&this.renderMoveSlots(s,this.selectedBoxId);for(let i of r)this.renderBox(s,i);this.syncGraphBoxes(r),this.syncNoteBoxes(r),this.syncBrowserBoxes(r),this.syncTerminalBoxes(r),this.syncTicketBoxes(r),window.requestAnimationFrame(()=>{this.resyncGraphEmbeds(),this.resyncNoteEmbeds(),this.resyncBrowserEmbeds(),this.resyncTerminalEmbeds(),this.resyncTicketEmbeds()})}previewBrowserBoxLink(e,r){this.plugin.dashboardBrowserBoxEmbed.navigateLink(e,r,s=>this.dashboardEl.querySelector(`[data-browser-host="${s}"]`))}resyncGraphEmbeds(){this.syncGraphBoxes(this.plugin.dashboardBoxStore.getBoxes())}resyncNoteEmbeds(){this.syncNoteBoxes(this.plugin.dashboardBoxStore.getBoxes())}resyncBrowserEmbeds(){this.syncBrowserBoxes(this.plugin.dashboardBoxStore.getBoxes())}resyncTerminalEmbeds(){this.syncTerminalBoxes(this.plugin.dashboardBoxStore.getBoxes())}resyncTicketEmbeds(){this.syncTicketBoxes(this.plugin.dashboardBoxStore.getBoxes())}syncNoteBoxes(e){let r=e.filter(s=>s.type==="note");r.length!==0&&this.plugin.dashboardNoteBoxEmbed.scheduleSync(r,s=>this.dashboardEl.querySelector(`[data-note-host="${s}"]`))}syncGraphBoxes(e){let r=e.filter(s=>s.type==="graph");r.length!==0&&this.plugin.dashboardGraphBoxEmbed.scheduleSync(r,s=>this.dashboardEl.querySelector(`[data-graph-host="${s}"]`))}syncBrowserBoxes(e){let r=e.filter(s=>s.type==="browser");r.length!==0&&this.plugin.dashboardBrowserBoxEmbed.scheduleSync(r,s=>this.dashboardEl.querySelector(`[data-browser-host="${s}"]`))}syncTerminalBoxes(e){let r=e.filter(s=>s.type==="terminal");r.length!==0&&this.plugin.dashboardTerminalBoxEmbed.scheduleSync(r,s=>this.dashboardEl.querySelector(`[data-terminal-host="${s}"]`))}syncTicketBoxes(e){let r=e.filter(s=>s.type==="ticket");r.length!==0&&this.plugin.dashboardTicketBoxEmbed.scheduleSync(r,s=>this.dashboardEl.querySelector(`[data-ticket-host="${s}"]`))}renderMoveSlots(e,r){let s=this.plugin.dashboardBoxStore.findValidMovePositions(r),i=this.plugin.dashboardBoxStore.getBoxById(r);if(i)for(let a of s){let n=a.col===i.col&&a.row===i.row,l=e.createDiv({cls:"corvidae-dashboard-move-slot"});n&&l.addClass("is-current"),l.style.gridColumn=`${a.col+1} / span ${i.cols}`,l.style.gridRow=`${a.row+1} / span ${i.rows}`,!n&&l.addEventListener("click",()=>{this.handleMoveTo(a.col,a.row)})}}async handleMoveTo(e,r){!this.selectedBoxId||!(await this.plugin.dashboardBoxStore.moveBox(this.selectedBoxId,e,r)).ok||this.plugin.refreshDashboardViews()}renderBox(e,r){let s=e.createDiv({cls:"corvidae-dashboard-box"});s.style.gridColumn=`${r.col+1} / span ${r.cols}`,s.style.gridRow=`${r.row+1} / span ${r.rows}`,s.dataset.boxId=r.id,r.id===this.selectedBoxId&&s.addClass("is-selected"),this.moveMode&&s.addClass("is-move-target");let i=s.createEl("button",{cls:"corvidae-dashboard-box-title",text:r.title});i.type="button",i.addEventListener("click",n=>{n.stopPropagation(),this.selectBox(r.id)});let a=s.createDiv({cls:"corvidae-dashboard-box-body"});if(r.type==="graph"){a.addClass("corvidae-dashboard-box-body--graph");let n=a.createDiv({cls:"corvidae-box-graph-host"});n.dataset.graphHost=r.id}else if(r.type==="note"){a.addClass("corvidae-dashboard-box-body--note");let n=a.createDiv({cls:"corvidae-box-note-host"});n.dataset.noteHost=r.id}else if(r.type==="browser"){a.addClass("corvidae-dashboard-box-body--browser");let n=a.createDiv({cls:"corvidae-box-browser-host"});n.dataset.browserHost=r.id}else if(r.type==="terminal"){a.addClass("corvidae-dashboard-box-body--terminal");let n=a.createDiv({cls:"corvidae-box-terminal-host"});n.dataset.terminalHost=r.id}else if(r.type==="ticket"){a.addClass("corvidae-dashboard-box-body--ticket");let n=a.createDiv({cls:"corvidae-box-ticket-host"});n.dataset.ticketHost=r.id}this.moveMode&&this.attachResizeHandle(s,r,e)}attachResizeHandle(e,r,s){let i=e.createDiv({cls:"corvidae-dashboard-box-resize-handle"});i.setAttribute("aria-label",d("dashboard.box.resizeHint"));let a=0,n=0,l=r.cols,c=r.rows,u=r.cols,f=r.rows,g=p=>{let v=this.getGridMetrics(s),b=Math.round((p.clientX-a)/v.stepX),y=Math.round((p.clientY-n)/v.stepY);u=Math.max(O,Math.min(6-r.col,l+b)),f=Math.max(O,Math.min(ue,c+y)),e.style.gridColumn=`${r.col+1} / span ${u}`,e.style.gridRow=`${r.row+1} / span ${f}`,e.toggleClass("is-resize-invalid",!this.plugin.dashboardBoxStore.canFitBoxSize(r.id,r.col,r.row,u,f))},h=()=>{document.removeEventListener("mousemove",g),document.removeEventListener("mouseup",h),e.removeClass("is-resizing"),(async()=>{if(!this.plugin.dashboardBoxStore.canFitBoxSize(r.id,r.col,r.row,u,f)||u===r.cols&&f===r.rows){this.render();return}if(!(await this.plugin.dashboardBoxStore.resizeBox(r.id,u,f)).ok){new me.Notice(d("dashboard.box.error.noSpace")),this.render();return}this.plugin.refreshDashboardViews()})()};i.addEventListener("mousedown",p=>{p.preventDefault(),p.stopPropagation(),a=p.clientX,n=p.clientY,l=r.cols,c=r.rows,u=r.cols,f=r.rows,e.addClass("is-resizing"),document.addEventListener("mousemove",g),document.addEventListener("mouseup",h)})}getGridMetrics(e){let r=getComputedStyle(e),s=parseFloat(r.columnGap||r.gap)||12,i=parseFloat(r.rowGap||r.gap)||12;return{stepX:(e.getBoundingClientRect().width-s*5)/6+s,stepY:100+i}}async openBoxInTab(e){if(this.canOpenBoxInTab(e)){if(e.type==="note"&&e.notePath){await this.app.workspace.openLinkText(e.notePath,"",!1,{active:!0});return}if(e.type==="graph"){await this.app.workspace.getLeaf(!1).setViewState({type:"graph",state:{},active:!0});return}if(e.type==="browser"&&e.link){let r=B(e.link);if(!r||!W(this.app))return;await this.app.workspace.getLeaf(!1).setViewState({...Fe(r),active:!0},{focus:!0});return}if(e.type==="terminal"){let r=J(this.app);if(!r)return;await this.app.workspace.getLeaf(!1).setViewState({...Me(r.profileSourceId,r.profile,e.title),active:!0},{focus:!0});return}if(e.type==="ticket"&&e.ticketProjectId){let r=this.plugin.dashboardTicketBoxEmbed.resolveDevelopmentLogPath(e.ticketProjectId);if(!r)return;await this.app.workspace.openLinkText(r,"",!1,{active:!0})}}}};var Co=50,os=250,Ae=class{constructor(t,e){this.app=t;this.plugin=e;this.syncTimer=null;this.layoutSyncInProgress=!1;this.cachedContentLeaf=null;this.barSuppressedByUser=!0}isBarOpen(){return this.findBarLeavesInMain().length>0}hasContentOpen(){return this.findMainContentLeaf()!==null}async toggleBar(){if(this.isBarOpen()){this.barSuppressedByUser=!0;for(let t of this.findBarLeavesInMain())t.detach();this.cleanupBarSplitClasses()}else{this.barSuppressedByUser=!1;let t=this.findMainContentLeaf();t&&await this.ensureSplitWithBar(t)}this.plugin.dashboardCrowControl?.updateButtonState()}scheduleSync(){this.plugin.settings.dashboardAutoOpen&&(this.syncTimer!==null&&window.clearTimeout(this.syncTimer),this.syncTimer=window.setTimeout(()=>{this.syncTimer=null,this.syncLayout()},Co))}getContentLeaf(){if(this.cachedContentLeaf&&this.isContentLeaf(this.cachedContentLeaf)&&this.isMainAreaLeaf(this.cachedContentLeaf))return this.cachedContentLeaf;let t=this.findMainContentLeaf();return this.cachedContentLeaf=t,t}async syncLayout(){if(this.plugin.settings.dashboardAutoOpen&&!this.layoutSyncInProgress){this.layoutSyncInProgress=!0;try{let t=this.findMainContentLeaf();if(t){if(this.cachedContentLeaf=t,this.barSuppressedByUser){for(let e of this.findBarLeavesInMain())e.detach();this.cleanupBarSplitClasses()}else{await this.ensureSplitWithBar(t);let e=this.findBarLeafForContent(t);e&&this.applyBarSplitDimensions(e)}this.plugin.dashboardCrowControl?.updateButtonState();return}this.cachedContentLeaf=null,await this.collapseToFull(),this.plugin.dashboardCrowControl?.updateButtonState()}finally{this.layoutSyncInProgress=!1,this.syncTabStripChrome()}}}syncTabStripChrome(){let t=document.querySelectorAll(".mod-root .workspace-tabs");for(let e=0;e<t.length;e++){let r=t.item(e);r?.instanceOf(HTMLElement)&&(r.classList.contains("corvidae-dashboard-bar-tabs")||r.toggleClass("corvidae-hide-new-tab",!0))}this.cleanupBarSplitClasses()}cleanupBarSplitClasses(){document.querySelectorAll(".corvidae-dashboard-bar-split").forEach(t=>{t.instanceOf(HTMLElement)&&(t.querySelector(".corvidae-dashboard-bar-tabs")||t.removeClass("corvidae-dashboard-bar-split"))})}async collapseToFull(){this.barSuppressedByUser=!0;for(let s of this.findBarLeavesInMain())s.detach();this.cleanupBarSplitClasses(),this.dedupeFullDashboardsInMain();let t=this.getMainTargetLeaf();if(!t)return;let e=t.view.getViewType(),r=t.getViewState().state;(e==="empty"||e===w)&&(e!==w||r?.mode!=="full")&&await t.setViewState({type:w,state:{mode:"full"},active:!0})}dedupeFullDashboardsInMain(){let t=this.app.workspace.getLeavesOfType(w).filter(s=>this.isMainAreaLeaf(s)?s.getViewState().state?.mode!=="bar":!1);if(t.length<=1)return;let e=this.app.workspace.getMostRecentLeaf(),r=t.find(s=>s===e)??t[0];for(let s of t)s!==r&&s.detach()}async ensureSplitWithBar(t){let e=this.findBarLeafForContent(t);e?e.getViewState().state?.mode!=="bar"&&await e.setViewState({type:w,state:{mode:"bar"},active:!1}):(e=this.app.workspace.createLeafBySplit(t,"horizontal",!1),await e.setViewState({type:w,state:{mode:"bar"},active:!1})),this.removeStrayFullDashboardsInMain(t,e),this.applyBarSplitDimensions(e),window.requestAnimationFrame(()=>{this.applyBarSplitDimensions(e)})}applyBarSplitDimensions(t){let e=this.findHorizontalSplitAncestor(t);if(!e)return;let r=e.children;if(!r||r.length!==2)return;let i=t.view.containerEl.closest(".workspace-split.mod-horizontal, .workspace-split.mod-horizontal-split")?.clientHeight??0;if(i<=os)return;let a=os/i*100,n=100-a;r[0].dimension=n,r[1].dimension=a}removeStrayFullDashboardsInMain(t,e){for(let r of this.app.workspace.getLeavesOfType(w))r===e||!this.isMainAreaLeaf(r)||r.getViewState().state?.mode==="bar"||r!==t&&r.detach()}findMainContentLeaf(){let t=this.app.workspace.getMostRecentLeaf();if(t&&this.isMainAreaLeaf(t)&&this.isContentLeaf(t))return t;let e=null;return this.app.workspace.iterateRootLeaves(r=>{this.isMainAreaLeaf(r)&&this.isContentLeaf(r)&&(e=r)}),e}findBarLeavesInMain(){return this.app.workspace.getLeavesOfType(w).filter(t=>this.isMainAreaLeaf(t)?t.getViewState().state?.mode==="bar":!1)}findBarLeafForContent(t){if(!this.findHorizontalSplitAncestor(t))return this.findBarLeavesInMain()[0]??null;for(let r of this.findBarLeavesInMain())if(this.shareHorizontalSplit(t,r))return r;return null}shareHorizontalSplit(t,e){let r=this.findHorizontalSplitAncestor(t),s=this.findHorizontalSplitAncestor(e);return r!==null&&r===s}findHorizontalSplitAncestor(t){let e=t.parent;for(;e;){if("direction"in e&&e.direction==="horizontal")return e;e=e.parent}return null}getMainTargetLeaf(){let t=this.app.workspace.getMostRecentLeaf();if(t&&this.isMainAreaLeaf(t))return t;let e=null;return this.app.workspace.iterateRootLeaves(r=>{this.isMainAreaLeaf(r)&&(e=r)}),e}isContentLeaf(t){let e=t.view.getViewType();return!(e==="empty"||e===w)}isMainAreaLeaf(t){let{leftSplit:e,rightSplit:r,rootSplit:s}=this.app.workspace,i=t.parent;for(;i&&i!==s;){if(i===e||i===r)return!1;i=i.parent}return i===s}isBarDashboardLeaf(t){if(t.view.getViewType()!==w)return!1;let e=t.view;return e instanceof j?e.isBarMode():t.getViewState().state?.mode==="bar"}};var qt=require("obsidian");var Po=".workspace-sidedock-vault-profile .workspace-sidedock-vault-profile-actions",Mo="bird",Fo="git-fork",De=class{constructor(t){this.plugin=t;this.button=null;this.graphButton=null}onload(){this.plugin.registerEvent(this.plugin.app.workspace.on("layout-change",()=>{this.ensureButtons(),this.updateButtonState()})),this.plugin.app.workspace.onLayoutReady(()=>{this.ensureButtons(),this.updateButtonState()})}onunload(){this.graphButton?.remove(),this.graphButton=null,this.button?.remove(),this.button=null}updateButtonState(){if(!this.button)return;let t=this.plugin.dashboardLayoutManager.isBarOpen(),e=this.plugin.dashboardLayoutManager.hasContentOpen();this.button.toggleClass("is-active",t),this.button.toggleClass("is-disabled",!e),this.button.disabled=!e,this.button.setAttribute("aria-pressed",t?"true":"false"),this.button.setAttribute("aria-label",t?d("dashboard.bar.collapse"):d("dashboard.bar.expand"))}ensureButtons(){let t=document.querySelector(Po)??document.querySelector(".workspace-sidedock-vault-profile");if(!t?.instanceOf(HTMLElement))return;let e=t;this.ensureGraphButton(e),this.ensureCrowButton(e),this.orderButtons(e)}ensureGraphButton(t){let e=t.querySelector(".corvidae-graph-profile-button");if(e){this.graphButton=e;return}let r=t.createEl("button",{cls:"clickable-icon corvidae-graph-profile-button",attr:{type:"button","aria-label":d("dashboard.actions.openGraph")}});(0,qt.setIcon)(r,Fo),r.addEventListener("click",()=>{this.openStandardGraph()}),this.graphButton=r}ensureCrowButton(t){let e=t.querySelector(".corvidae-crow-profile-button");if(e){this.button=e;return}let r=t.createEl("button",{cls:"clickable-icon corvidae-crow-profile-button",attr:{type:"button","aria-label":d("dashboard.bar.expand")}});(0,qt.setIcon)(r,Mo),r.addEventListener("click",()=>{this.plugin.dashboardLayoutManager.toggleBar()}),this.button=r}orderButtons(t){!this.graphButton||!this.button||(this.graphButton.nextElementSibling!==this.button&&t.insertBefore(this.graphButton,this.button),this.button.parentElement===t&&t.appendChild(this.button))}async openStandardGraph(){await this.plugin.app.workspace.getLeaf(!1).setViewState({type:"graph",state:{},active:!0})}};var is=64;function Yt(o,t){if(o==="graph")return{type:"graph"};if(o==="note")return{type:"note",notePath:typeof t?.notePath=="string"&&t.notePath.trim()?t.notePath.trim():void 0};if(o==="browser")return{type:"browser",link:typeof t?.link=="string"&&t.link.trim()?t.link.trim():void 0};if(o==="terminal")return{type:"terminal"};if(o==="ticket"){let e=typeof t?.ticketProjectId=="string"&&t.ticketProjectId.trim()?t.ticketProjectId.trim():void 0,r=t?.ticketDisplayMode==="last"||t?.ticketDisplayMode==="all"?t.ticketDisplayMode:"last";return{type:"ticket",ticketProjectId:e,ticketDisplayMode:r}}return{type:"empty"}}function Kt(o){return o.type!=="note"&&delete o.notePath,o.type!=="browser"&&delete o.link,o.type!=="ticket"&&(delete o.ticketProjectId,delete o.ticketDisplayMode),o}var Ie=class{constructor(t){this.plugin=t;this.boxes=[]}loadFromData(t){let e=t;if(!Array.isArray(e?.dashboardBoxes)){this.boxes=[];return}this.boxes=e.dashboardBoxes.map(r=>this.normalizeBox(r)).filter(r=>r!==null)}getBoxes(){return[...this.boxes]}getBoxById(t){return this.boxes.find(e=>e.id===t)??null}findPlacement(t,e,r){if(t<1||e<1||t>6)return null;for(let s=0;s<is;s++)for(let i=0;i<=6-t;i++)if(this.canPlaceAt(i,s,t,e,r))return{col:i,row:s};return null}findValidMovePositions(t){let e=this.getBoxById(t);if(!e)return[];let r=[];for(let s=0;s<is;s++)for(let i=0;i<=6-e.cols;i++)this.canPlaceAt(i,s,e.cols,e.rows,t)&&r.push({col:i,row:s});return r}canFitBoxSize(t,e,r,s,i){return s<O||i<O||s>6||e+s>6||i>ue?!1:this.canPlaceAt(e,r,s,i,t)}async addBox(t){let e=this.findPlacement(t.cols,t.rows);if(!e)return{ok:!1,reason:"noSpace"};let r=Yt(t.type,{notePath:t.notePath,link:t.link,ticketProjectId:t.ticketProjectId,ticketDisplayMode:t.ticketDisplayMode}),s=Kt({id:crypto.randomUUID(),title:t.title.trim(),...r,cols:t.cols,rows:t.rows,col:e.col,row:e.row});return this.boxes.push(s),await this.persist(),{ok:!0,box:s}}async updateBoxTitle(t,e){let r=this.boxes.findIndex(i=>i.id===t);if(r<0)return{ok:!1,reason:"notFound"};let s={...this.boxes[r],title:e.trim()};return this.boxes[r]=s,await this.persist(),{ok:!0,box:s}}async updateBox(t,e){let r=this.boxes.findIndex(a=>a.id===t);if(r<0)return{ok:!1,reason:"notFound"};let s=Yt(e.type,{notePath:e.notePath,link:e.link,ticketProjectId:e.ticketProjectId,ticketDisplayMode:e.ticketDisplayMode}),i=Kt({...this.boxes[r],title:e.title.trim(),...s});return this.boxes[r]=i,await this.persist(),{ok:!0,box:i}}async resizeBox(t,e,r){let s=this.boxes.findIndex(c=>c.id===t);if(s<0)return{ok:!1,reason:"notFound"};let i=this.boxes[s],a=Math.max(O,Math.min(e,6-i.col)),n=Math.max(O,Math.min(r,ue));if(!this.canPlaceAt(i.col,i.row,a,n,t))return{ok:!1,reason:"noSpace"};let l={...i,cols:a,rows:n};return this.boxes[s]=l,await this.persist(),{ok:!0,box:l}}async moveBox(t,e,r){let s=this.boxes.findIndex(n=>n.id===t);if(s<0)return{ok:!1,reason:"notFound"};let i=this.boxes[s];if(!this.canPlaceAt(e,r,i.cols,i.rows,t))return{ok:!1,reason:"noSpace"};let a={...i,col:e,row:r};return this.boxes[s]=a,await this.persist(),{ok:!0,box:a}}async deleteBox(t){let e=this.boxes.findIndex(r=>r.id===t);return e<0?{ok:!1,reason:"notFound"}:(this.boxes.splice(e,1),await this.persist(),{ok:!0})}async persist(){let t=await this.plugin.loadData(),e=S(t)?t:{};await this.plugin.saveData({...e,...this.plugin.settings,dashboardBoxes:this.boxes})}canPlaceAt(t,e,r,s,i){for(let a of this.boxes)if(!(i&&a.id===i)&&this.overlaps(t,e,r,s,a))return!1;return!0}overlaps(t,e,r,s,i){let a=t+r,n=e+s,l=i.col+i.cols,c=i.row+i.rows;return t<l&&a>i.col&&e<c&&n>i.row}normalizeBox(t){if(!t||typeof t!="object")return null;let e=t;if(typeof e.id!="string"||typeof e.title!="string"||typeof e.cols!="number"||typeof e.rows!="number"||typeof e.col!="number"||typeof e.row!="number"||e.cols<O||e.rows<O||e.cols>6||e.rows>ue||e.col<0||e.row<0||e.col+e.cols>6)return null;let r=Yt(e.type,{notePath:e.notePath,link:e.link,ticketProjectId:e.ticketProjectId,ticketDisplayMode:e.ticketDisplayMode});return Kt({id:e.id,title:e.title.trim(),...r,cols:e.cols,rows:e.rows,col:e.col,row:e.row})}};var pt=require("obsidian");var as=require("obsidian");function Be(o){return o.containerEl}var ns="corvidae-box-graph-workspace";function Ao(o,t){return!!Be(o).closest(`.${t}`)}function ls(o){return Ao(o,ns)}function ct(o){return o.rootSplit.containerEl}function Q(o,t,e="vertical",r=ns){let s=new as.WorkspaceSplit(o,e);s.getRoot=()=>o.rootSplit,s.getContainer=()=>o.rootSplit;let{containerEl:i}=s;return i.addClass(r),t.empty(),t.appendChild(i),{leaf:o.createLeafInParent(s,0),rootSplit:s}}function C(o){o.leaf.detach(),o.rootSplit.containerEl.remove()}function ee(o,t){let e=o.rootSplit.containerEl;e.parentElement!==t&&(t.empty(),t.appendChild(e))}var ds="__corvidaeGraphNavPatched",Ne=class{constructor(t){this.plugin=t;this.mounts=new Map;this.syncTimer=null;this.cleanupTimer=null;this.redirecting=!1;this.originalOpenLinkText=null}onload(){let t=this.plugin.app.workspace;this.originalOpenLinkText=t.openLinkText.bind(t),this.plugin.registerEvent(this.plugin.app.workspace.on("layout-change",()=>{this.scheduleCleanup()}))}onunload(){this.originalOpenLinkText&&(this.plugin.app.workspace.openLinkText=this.originalOpenLinkText,this.originalOpenLinkText=null)}getLeaves(){return[...this.mounts.values()].map(t=>t.leaf)}scheduleSync(t,e){this.syncTimer!==null&&window.clearTimeout(this.syncTimer),this.syncTimer=window.setTimeout(()=>{this.syncTimer=null,this.sync(t,e)},0)}async sync(t,e){let r=new Set(t.map(s=>s.id));for(let[s,i]of this.mounts.entries())r.has(s)||(C(i),this.mounts.delete(s));for(let s of t){let i=e(s.id);i&&await this.mount(s.id,i)}this.plugin.refreshGraphFeatures()}detachAll(){for(let t of this.mounts.values())C(t);this.mounts.clear()}scheduleCleanup(){this.redirecting||(this.cleanupTimer!==null&&window.clearTimeout(this.cleanupTimer),this.cleanupTimer=window.setTimeout(()=>{this.cleanupTimer=null,this.cleanupEmbeddedNoteViews()},0))}async openInMainTab(t,e){if(!(!this.originalOpenLinkText||this.redirecting)){this.redirecting=!0;try{await this.originalOpenLinkText(t.path,"",e,{active:!0})}finally{this.redirecting=!1}}}async cleanupEmbeddedNoteViews(){if(!this.redirecting)for(let t of this.mounts.values()){let e=ct(t),r=[];this.plugin.app.workspace.iterateAllLeaves(s=>{if(!e.contains(Be(s))||s.view?.getViewType?.()==="graph")return;let i=s.view.file;i instanceof pt.TFile&&r.push({leaf:s,file:i})});for(let{leaf:s,file:i}of r)s.detach(),await this.openInMainTab(i,s!==t.leaf);if(t.leaf.view?.getViewType?.()!=="graph"){let s=t.leaf.view.file;s instanceof pt.TFile&&await this.openInMainTab(s,!1),await this.restoreGraphView(t)}}}async restoreGraphView(t){let e=t.leaf,r=e.__corvidaeOrigSetViewState??e.setViewState.bind(e);this.redirecting=!0;try{await r.call(e,{type:"graph",state:{},active:!1},{focus:!1})}finally{this.redirecting=!1}}patchGraphLeaf(t){let e=t.leaf;if(e[ds])return;e[ds]=!0;let r=e.openFile.bind(e),s=e.setViewState.bind(e);e.__corvidaeOrigOpenFile=r,e.__corvidaeOrigSetViewState=s,e.openFile=async(i,a)=>{if(this.redirecting||e.view?.getViewType?.()!=="graph")return r(i,a);await this.openInMainTab(i,!1)},e.setViewState=async(i,a)=>{if(this.redirecting||i.type==="graph")return s(i,a);let n=i.state&&typeof i.state=="object"&&"file"in i.state&&typeof i.state.file=="string"?i.state.file:null;if(n){let l=this.plugin.app.vault.getFileByPath(n);if(l instanceof pt.TFile){await this.openInMainTab(l,!1);return}}return s(i,a)}}async mount(t,e){let r=this.mounts.get(t);r?ee(r,e):(r=Q(this.plugin.app.workspace,e),this.mounts.set(t,r),await r.leaf.setViewState({type:"graph",state:{},active:!1})),this.patchGraphLeaf(r),await r.leaf.loadIfDeferred(),r.leaf.onResize()}};var ht=require("obsidian");var Do="corvidae-box-note-workspace",Re=class{constructor(t){this.plugin=t;this.mounts=new Map;this.syncTimer=null}scheduleSync(t,e){this.syncTimer!==null&&window.clearTimeout(this.syncTimer),this.syncTimer=window.setTimeout(()=>{this.syncTimer=null,this.sync(t,e)},0)}async sync(t,e){let r=new Set(t.filter(s=>s.notePath).map(s=>s.id));for(let[s,i]of this.mounts.entries())r.has(s)||(C(i.mount),this.mounts.delete(s));for(let s of t){if(!s.notePath)continue;let i=e(s.id);i&&await this.mount(s,i)}}detachAll(){for(let t of this.mounts.values())C(t.mount);this.mounts.clear()}async mount(t,e){let r=t.notePath;if(!r)return;let s=this.plugin.app.vault.getFileByPath(r);if(!(s instanceof ht.TFile))return;let i=this.mounts.get(t.id);if(i)ee(i.mount,e),i.notePath!==r?(i.notePath=r,await this.openNotePreview(i.mount,s)):this.ensurePreviewMode(i.mount);else{let a=Q(this.plugin.app.workspace,e,"vertical",Do);i={mount:a,notePath:r},this.mounts.set(t.id,i),await this.openNotePreview(a,s)}await i.mount.leaf.loadIfDeferred(),i.mount.leaf.onResize()}async openNotePreview(t,e){await t.leaf.setViewState({type:"markdown",state:{file:e.path,mode:"preview"},active:!1},{focus:!1})}ensurePreviewMode(t){let e=t.leaf.view;e instanceof ht.MarkdownView&&e.getMode()!=="preview"&&t.leaf.setViewState({type:"markdown",state:{file:e.file?.path,mode:"preview"},active:!1},{focus:!1})}};var cs=`
html, body {
	scrollbar-width: none !important;
	-ms-overflow-style: none !important;
}
html::-webkit-scrollbar,
body::-webkit-scrollbar,
*::-webkit-scrollbar {
	display: none !important;
	width: 0 !important;
	height: 0 !important;
}
`,Io=".view-content, .webviewer-content, .workspace-leaf-content, .workspace-tabs, .workspace-tab-container, .workspace-split";function Xt(o){let t=ct(o);t.querySelectorAll(Io).forEach(e=>{e.addClass("corvidae-hide-native-scrollbar")}),t.querySelectorAll("webview").forEach(e=>{let r=()=>{try{e.insertCSS?.(cs),e.executeJavaScript?.(`
					(function() {
						if (document.getElementById("corvidae-hide-scrollbars")) return;
						const el = document.createElement("style");
						el.id = "corvidae-hide-scrollbars";
						el.textContent = ${JSON.stringify(cs)};
						document.documentElement.appendChild(el);
					})();
				`)}catch{}};e.dataset.corvidaeScrollHidden!=="true"&&(e.dataset.corvidaeScrollHidden="true",e.addEventListener("dom-ready",r)),r()})}var Oe=class{constructor(t){this.plugin=t;this.mounts=new Map;this.syncTimer=null}async navigateLink(t,e,r){let s=B(e);if(!s)return;let i=r(t);i&&await this.mount({id:t,type:"browser",link:s},i)}scheduleSync(t,e){this.syncTimer!==null&&window.clearTimeout(this.syncTimer),this.syncTimer=window.setTimeout(()=>{this.syncTimer=null,this.sync(t,e)},0)}async sync(t,e){let r=new Set(t.filter(s=>B(s.link??"")).map(s=>s.id));for(let[s,i]of this.mounts.entries())r.has(s)||(C(i.mount),this.mounts.delete(s));for(let s of t){let i=e(s.id);i&&await this.mount(s,i)}}detachAll(){for(let t of this.mounts.values())C(t.mount);this.mounts.clear()}async mount(t,e){let r=B(t.link??"");if(!r)return;if(!W(this.plugin.app)){this.showUnavailable(e);let i=this.mounts.get(t.id);i&&(C(i.mount),this.mounts.delete(t.id));return}e.empty(),e.removeClass("corvidae-browser-unavailable");let s=this.mounts.get(t.id);if(s&&s.url!==r&&(C(s.mount),this.mounts.delete(t.id),s=void 0),s)ee(s.mount,e);else{let i=Q(this.plugin.app.workspace,e,"vertical",rs);s={mount:i,url:r},this.mounts.set(t.id,s),await i.leaf.setViewState(Fe(r),{focus:!1})}await s.mount.leaf.loadIfDeferred(),s.mount.leaf.onResize(),Xt(s.mount),window.requestAnimationFrame(()=>{Xt(s.mount)})}showUnavailable(t){t.empty(),t.addClass("corvidae-browser-unavailable"),t.createDiv({cls:"corvidae-browser-unavailable-text",text:d("dashboard.box.webviewerUnavailable")})}};var Ge=class{constructor(t){this.plugin=t;this.mounts=new Map;this.syncTimer=null}scheduleSync(t,e){this.syncTimer!==null&&window.clearTimeout(this.syncTimer),this.syncTimer=window.setTimeout(()=>{this.syncTimer=null,this.sync(t,e)},0)}async sync(t,e){let r=new Set(t.map(s=>s.id));for(let[s,i]of this.mounts.entries())r.has(s)||(C(i),this.mounts.delete(s));for(let s of t){let i=e(s.id);i&&await this.mount(s,i)}}detachAll(){for(let t of this.mounts.values())C(t);this.mounts.clear()}async mount(t,e){let r=J(this.plugin.app);if(!r){this.showUnavailable(e);let i=this.mounts.get(t.id);i&&(C(i),this.mounts.delete(t.id));return}e.empty(),e.removeClass("corvidae-terminal-unavailable");let s=this.mounts.get(t.id);s?ee(s,e):(s=Q(this.plugin.app.workspace,e,"vertical",es),this.mounts.set(t.id,s),await s.leaf.setViewState(Me(r.profileSourceId,r.profile,t.title),{focus:!1})),await s.leaf.loadIfDeferred(),s.leaf.onResize()}showUnavailable(t){t.empty(),t.addClass("corvidae-terminal-unavailable"),t.createDiv({cls:"corvidae-terminal-unavailable-text",text:d("dashboard.box.terminalUnavailable")})}};var se=require("obsidian");var Bo=/^> \[!\w+\]/,No=/^> \[!NOTE\].*TICKET/i;function ps(o,t){let e=[o[t]];for(let r=t+1;r<o.length;r++){let s=o[r];if(Bo.test(s))break;if(s.startsWith("> ")||s===">"){e.push(s);continue}if(s.trim()==="")break}return e.join(`
`)}function hs(o){let t=o.split(`
`),e=[];for(let r=0;r<t.length;r++)No.test(t[r].trim())&&e.push(r);return e}function Ro(o){let t=o.split(`
`),e=hs(o);return e.length===0?"":ps(t,e[e.length-1])}function Oo(o){let t=o.split(`
`),e=hs(o);return e.length===0?"":e.map(r=>ps(t,r)).join(`

`)}function us(o,t){return t==="last"?Ro(o):Oo(o)}var He=class{constructor(t){this.plugin=t;this.mounts=new Map;this.syncTimer=null;this.vaultListenerRegistered=!1}onload(){this.vaultListenerRegistered||(this.vaultListenerRegistered=!0,this.plugin.registerEvent(this.plugin.app.vault.on("modify",t=>{if(!(t instanceof se.TFile)||t.extension!=="md")return;[...this.mounts.values()].some(r=>r.sourcePath===t.path)&&this.syncAllMounted()})))}scheduleSync(t,e){this.syncTimer!==null&&window.clearTimeout(this.syncTimer),this.syncTimer=window.setTimeout(()=>{this.syncTimer=null,window.requestAnimationFrame(()=>{this.sync(t,e)})},0)}async sync(t,e){let r=new Set(t.map(s=>s.id));for(let[s,i]of this.mounts.entries())r.has(s)||(this.disposeMount(i),this.mounts.delete(s));for(let s of t){let i=e(s.id);i&&await this.mount(s,i)}}detachAll(){for(let t of this.mounts.values())this.disposeMount(t);this.mounts.clear()}disposeMount(t){t.renderComponent?.unload(),t.renderComponent=null}async syncAllMounted(){for(let[t,e]of this.mounts.entries()){let r=this.plugin.dashboardBoxStore.getBoxById(t);!r||r.type!=="ticket"||await this.renderMount(r,e)}}async mount(t,e){let r=t.ticketProjectId??"",s=t.ticketDisplayMode??"last",i=this.resolveDevelopmentLogPath(r)??"",a=this.mounts.get(t.id),l=!a||a.host!==e||!a.contentEl.isConnected?(()=>{a&&this.disposeMount(a),e.empty();let c={host:e,contentEl:e.createDiv({cls:"corvidae-box-ticket-content"}),projectId:r,displayMode:s,sourcePath:i,renderComponent:null};return this.mounts.set(t.id,c),c})():(a.projectId=r,a.displayMode=s,a.sourcePath=i,a);await this.renderMount(t,l)}async renderMount(t,e){if(e.renderComponent?.unload(),e.renderComponent=null,e.contentEl.empty(),!e.projectId){e.contentEl.createDiv({cls:"corvidae-box-ticket-empty",text:d("dashboard.box.ticketNoProject")});return}if(!e.sourcePath){e.contentEl.createDiv({cls:"corvidae-box-ticket-empty",text:d("dashboard.box.ticketLogMissing")});return}let r=this.plugin.app.vault.getFileByPath(e.sourcePath);if(!(r instanceof se.TFile)){e.contentEl.createDiv({cls:"corvidae-box-ticket-empty",text:d("dashboard.box.ticketLogMissing")});return}let s=await this.plugin.app.vault.read(r),i=t.ticketDisplayMode??"last";e.displayMode=i;let a=us(s,i);if(!a.trim()){e.contentEl.createDiv({cls:"corvidae-box-ticket-empty",text:d("dashboard.box.ticketLogEmpty")});return}let n=new se.Component;n.load(),e.renderComponent=n,await se.MarkdownRenderer.render(this.plugin.app,a,e.contentEl,r.path,n)}resolveDevelopmentLogPath(t){return t&&this.plugin.settings.ticketProjects.find(s=>s.id===t)?.developmentLogPath?.trim()||null}};var Vo=require("obsidian");var E=require("obsidian");function m(o){return o.replace(/^\/+|\/+$/g,"")}function oe(o,t){let e=m(o);if(!e)return!1;for(let r of t){let s=m(r);if(!s||e===s||!e.startsWith(`${s}/`))continue;let i=e.slice(s.length+1);if(i.length>0&&!i.includes("/"))return!0}return!1}function A(o,t){let e=m(o);if(!e)return!1;for(let r of t){let s=m(r);if(!s||!e.startsWith(`${s}/`))continue;if(e.slice(s.length+1).includes("/"))return!0}return!1}function Zt(o,t){return oe(o,t)||A(o,t)}var Jt=require("obsidian");function L(o){let t=o.lastIndexOf("/");if(t===-1)return!1;let e=o.slice(t+1);if(!e.endsWith(".md"))return!1;let r=e.slice(0,-3);return(o.slice(0,t).split("/").pop()??"")===r}function Qt(o){return o.slice(0,o.lastIndexOf("/"))}function be(o,t){return o?`${o}/${t}.md`:`${t}.md`}function T(o,t){let e=be(t.path,t.name);if(!L(e))return null;let r=o.vault.getAbstractFileByPath(e);return r instanceof Jt.TFile?r:null}function er(o,t,e){let r=e,s=0;for(;;){let i=t?`${t}/${r}`:r,a=be(i,r);if(!o(i)&&!o(a))return{folderPath:i,notePath:a};s++,r=`${e} ${s}`}}var tr=200,Ve=class{constructor(t,e){this.app=t;this.settings=e;this.processing=new Set;this.queue=Promise.resolve()}updateSettings(t){this.settings=t}async createFolderNote(t){if(!this.settings.folderNoteEnabled)return null;let e=t?.path??"";if(e&&this.isExcluded(e))return null;let{folderPath:r,notePath:s}=er(i=>this.app.vault.getAbstractFileByPath(i)!==null,e,d("folderNote.defaultName"));return this.withProcessing([r,s],async()=>(this.app.vault.getAbstractFileByPath(r)||await this.safeCreateFolder(r),this.safeCreate(s,"")))}onNoteRename(t,e){return this.schedule(`${e}\0${t.path}`,()=>this.handleNoteRename(t,e),tr)}onFolderRename(t,e){return this.schedule(`${e}\0${t.path}`,()=>this.handleFolderRename(t,e),tr)}async handleNoteRename(t,e){if(this.isExcluded(t.path)&&this.isExcluded(e)||this.isProcessing(t.path)||this.isProcessing(e)||!this.settings.folderNoteEnabled||!this.settings.folderNoteSyncRename)return;let r=this.app.vault.getFileByPath(t.path);!r||!L(e)||await this.syncFolderWithNoteRename(r,e)}async handleFolderRename(t,e){if(!this.shouldHandleFolder(t.path)&&!this.shouldHandleFolder(e)||this.isProcessing(t.path)||this.isProcessing(e)||!this.settings.folderNoteSyncRename)return;let r=this.app.vault.getAbstractFileByPath(t.path);if(!(r instanceof E.TFolder))return;let s=e.split("/").pop()??"";await this.reconcileFolderNoteAfterRename(r,s)}async reconcileFolderNoteAfterRename(t,e){let r=be(t.path,t.name);if(this.app.vault.getAbstractFileByPath(r)instanceof E.TFile)return;let s=t.children.find(i=>i instanceof E.TFile&&i.extension==="md"&&i.basename===e);s instanceof E.TFile&&await this.safeRename(s,r)}async adoptOrMoveNote(t,e){let r=this.app.vault.getAbstractFileByPath(e);if(r instanceof E.TFile&&r.path!==t.path){try{let[s,i]=await Promise.all([this.app.vault.read(t),this.app.vault.read(r)]);i.trim()===""&&s.trim()!==""&&await this.app.vault.modify(r,s),t.path!==r.path&&await this.app.fileManager.trashFile(t)}catch{return r}return r}return t.path===e?t:this.safeRename(t,e)}async syncFolderWithNoteRename(t,e){let r=Qt(e),s=e.slice(e.lastIndexOf("/")+1,-3),i=t.basename,a=t.parent;if(!a)return;let n=this.app.vault.getAbstractFileByPath(r);if(!(n instanceof E.TFolder))return;let l=r.includes("/")?r.slice(0,r.lastIndexOf("/")):"";if(a.path===r&&i!==s){let c=l?`${l}/${i}`:i,u=be(c,i);await this.withProcessing([t.path,r,c,u],async()=>{let f=this.app.vault.getFileByPath(t.path);if(!f)return;let g=this.app.vault.getAbstractFileByPath(c);if(g&&g.path!==n.path){await this.adoptOrMoveNote(f,u);return}n.path!==c&&await this.safeRename(n,c);let h=this.app.vault.getFileByPath(f.path);h&&h.path!==u&&await this.safeRename(h,u)});return}L(t.path)}async safeCreateFolder(t){let e=this.app.vault.getAbstractFileByPath(t);if(e instanceof E.TFolder)return e;if(e)return null;try{return await this.app.vault.createFolder(t)}catch{let r=this.app.vault.getAbstractFileByPath(t);return r instanceof E.TFolder?r:null}}async safeCreate(t,e){if(this.app.vault.getAbstractFileByPath(t))return null;try{return await this.app.vault.create(t,e)}catch{return this.app.vault.getFileByPath(t)}}async safeRename(t,e){if(t.path===e)return t instanceof E.TFile?t:void 0;let r=this.app.vault.getAbstractFileByPath(e);if(r)return t instanceof E.TFile&&r instanceof E.TFile?this.adoptOrMoveNote(t,e):t instanceof E.TFile?t:void 0;try{await this.app.fileManager.renameFile(t,e)}catch{let s=this.app.vault.getAbstractFileByPath(e);return t instanceof E.TFile&&s instanceof E.TFile?s:t instanceof E.TFile?t:void 0}if(t instanceof E.TFile)return this.app.vault.getFileByPath(e)??t}shouldHandleFolder(t){return this.settings.folderNoteEnabled&&!this.isExcluded(t)}isExcluded(t){for(let e of this.settings.folderNoteExcludePrefixes){let r=e.replace(/\/$/,"");if(t===r||t.startsWith(`${r}/`))return!0}return A(t,this.settings.developmentFolders)}isProcessing(t){return this.processing.has(t)}schedule(t,e,r=tr){return this.enqueue(async()=>{await this.defer(r);try{return await e()}catch{return}})}defer(t){return new Promise(e=>window.setTimeout(e,t))}enqueue(t){let e=this.queue.then(t,t);return this.queue=e.then(()=>{},()=>{}),e}async withProcessing(t,e){for(let r of t)this.processing.add(r);try{return await e()}finally{for(let r of t)this.processing.delete(r)}}};var _e=require("obsidian");var Go="action-primary";function Ho(o){return o.includes("file-explorer")}var ze=class{constructor(t){this.plugin=t}onload(){this.plugin.registerEvent(this.plugin.app.workspace.on("file-menu",(t,e,r)=>{Ho(r)&&this.addMenuItem(t,e)}))}onunload(){}refreshUi(){}addMenuItem(t,e){if(!this.plugin.settings.folderNoteEnabled)return;let r=this.resolveParentFromFile(e);t.addItem(s=>{s.setSection(Go).setTitle(d("folderNote.menuTitle")).setIcon("folder-tree").onClick(()=>{this.plugin.createFolderNote(r)})})}resolveParentFromFile(t){return t instanceof _e.TFolder?t:t instanceof _e.TFile?t.parent:this.resolveDefaultParent()}resolveDefaultParent(){let t=this.plugin.app.workspace.getActiveFile();if(t?.parent)return t.parent;let e=this.plugin.app.vault.getAbstractFileByPath("");return e instanceof _e.TFolder?e:null}};var _o="h1, h2, h3, h4, h5, h6",fs="corvidae-callout-favicon",zo="corvidae-heading-open-links";function gs(o){let t=/^H([1-6])$/i.exec(o.tagName);return t?Number(t[1]):6}function ms(o){return!!o&&/^https?:\/\//i.test(o)}function Wo(o){let r=(o.querySelector(".callout-title")??o.querySelector(".callout-title-inner")??o).querySelectorAll("a.external-link, a[href]");for(let s=0;s<r.length;s++){let i=r.item(s);if(i?.instanceOf(HTMLAnchorElement)&&ms(i.href))return i.href}return null}function jo(o){try{let t=new URL(o).hostname;return t?`https://www.google.com/s2/favicons?domain=${encodeURIComponent(t)}&sz=32`:null}catch{return null}}function Uo(o){let t=o.querySelectorAll(".callout");for(let e=0;e<t.length;e++){let r=t.item(e);if(!r?.instanceOf(HTMLElement))continue;let s=Wo(r);if(!s)continue;let i=r.querySelector(".callout-icon");if(!i?.instanceOf(HTMLElement)||i.querySelector(`.${fs}`))continue;let a=jo(s);if(!a)continue;let n=Array.from(i.childNodes);i.empty(),i.createEl("img",{cls:fs,attr:{src:a,alt:"",decoding:"async"}}).addEventListener("error",()=>{i.empty();for(let c of n)i.appendChild(c)})}}function $o(o){let t=gs(o),e=[],r=new Set,s=o.nextElementSibling;for(;s;){if(!s.instanceOf(HTMLElement)){s=s.nextElementSibling;continue}if(/^H[1-6]$/i.test(s.tagName)&&gs(s)<=t)break;let i=s.classList.contains("callout")?[s]:Array.from(s.querySelectorAll(".callout"));for(let a of i){if(!a.instanceOf(HTMLElement))continue;let n=a.querySelectorAll("a.external-link, a[href]");for(let l=0;l<n.length;l++){let c=n.item(l);c?.instanceOf(HTMLAnchorElement)&&(!ms(c.href)||r.has(c.href)||(r.add(c.href),e.push(c.href)))}}s=s.nextElementSibling}return e}function qo(o){o.forEach((t,e)=>{window.setTimeout(()=>{window.open(t,"_blank","noopener,noreferrer")},e*120)})}function Yo(o){let t=o.querySelectorAll(_o);for(let e=0;e<t.length;e++){let r=t.item(e);if(!r?.instanceOf(HTMLElement)||r.dataset.corvidaeHeadingLinks==="1")continue;let s=$o(r);s.length!==0&&(r.dataset.corvidaeHeadingLinks="1",r.addClass(zo),r.addEventListener("click",i=>{let a=i.target;a&&typeof a.instanceOf=="function"&&a.instanceOf(Element)&&a.closest("a")||(i.preventDefault(),qo(s))}))}}function rr(o){o.registerMarkdownPostProcessor((t,e)=>{Uo(t),Yo(t)})}var ae=require("obsidian");var sr=require("obsidian");var bs="dev.md";function U(o){let t=m(o);return(0,sr.normalizePath)(`${t}/${bs}`)}function We(o,t){let e=m(t);return e?(0,sr.normalizePath)(o)===U(e):!1}function ie(o,t){let e=m(o);if(!e)return"";let r=m(t);return r?r===e||r.startsWith(`${e}/`)?r:m(`${e}/${r}`):e}function ir(o){let t=o.split("/");return t[t.length-1]||o}function ut(o){let t=o.lastIndexOf("/");return t<=0?null:o.slice(0,t)}function vs(o){let t=ir(o),e=ut(o);return e?`${ir(e)}_${t}`:t}function or(o,t){return o===t||o.startsWith(`${t}/`)}function je(o,t,e=""){let r=m(t),s=ie(t,e),i=[],a=[],n=new Set;if(!r||!s)return{nodes:i,edges:a,scanRoot:s||r};let l=U(r),c=`${s}/`,u=g=>{let h=m(g);if(!h||n.has(h)||!or(h,s))return;let p=ut(h);p&&or(p,s)&&u(p),n.add(h);let v=h===s?null:p&&or(p,s)?p:null;i.push({id:h,path:h,label:ir(h),kind:"folder",parentId:v}),v&&a.push({source:v,target:h})};u(s);let f=o.vault.getAbstractFileByPath(s);if(f instanceof ae.TFolder){let g=h=>{for(let p of h.children){if(p instanceof ae.TFolder){u(p.path),g(p);continue}if(!(p instanceof ae.TFile)||p.path===l||!p.path.startsWith(c))continue;let v=ut(p.path)??s;u(v),!n.has(p.path)&&(n.add(p.path),i.push({id:p.path,path:p.path,label:vs(p.path),kind:"file",parentId:v}),a.push({source:v,target:p.path}))}};g(f)}else for(let g of o.vault.getFiles()){if(!g.path.startsWith(c)||g.path===l)continue;let h=ut(g.path);if(h&&u(h),n.has(g.path))continue;n.add(g.path);let p=h&&n.has(h)?h:s;i.push({id:g.path,path:g.path,label:vs(g.path),kind:"file",parentId:p}),p&&a.push({source:p,target:g.path})}return i.sort((g,h)=>g.path.localeCompare(h.path)),{nodes:i,edges:a,scanRoot:s}}function xs(o){let t=[];for(let e of o.nodes){if(e.kind!=="folder"&&e.kind!=="file")continue;let r={path:e.path,kind:e.kind};e.parentId&&(r.parent=e.parentId),t.push(r)}return t}function Ue(o,t){let e=(0,ae.normalizePath)(o);for(let r of t){let s=ve(r.folder,r.codeFolder??"");if(!s)continue;if(U(s)===e)return r.id;let i=m(r.folder);if(i&&U(i)===e)return r.id}return null}function ar(o,t){let e=m(o);if(!e)return null;let r=null,s=-1;for(let i of t){let a=m(i.folder);if(!a)continue;let n=ve(i.folder,i.codeFolder??""),l=ie(i.folder,i.codeFolder??""),c=-1;n===e||a===e?c=4:l===e?c=3:a.startsWith(`${e}/`)||l.startsWith(`${e}/`)?c=2:n.startsWith(`${e}/`)&&(c=1),c>s&&(s=c,r=i.id)}return r}function ve(o,t=""){let e=m(o);if(!e)return"";let r=e.slice(e.lastIndexOf("/")+1).toLowerCase();return new Set(["src","lib","app","source"]).has(r)&&(e.includes("/")?e.slice(0,e.lastIndexOf("/")):"")||e}var ys="corvidae-dev-graph",ft="dev-root",nr="nodes";function $e(){return typeof crypto<"u"&&crypto.randomUUID?crypto.randomUUID():`custom-graph-${Date.now()}-${Math.random().toString(36).slice(2,9)}`}function ne(o){return o.filter(t=>m(t.folder).length>0)}function xe(o,t){return o.find(e=>e.id===t)}function le(o,t){return t.some(e=>{let r=ve(e.folder,e.codeFolder??"");return We(o,r)||We(o,e.folder)})}function Ko(o,t){if(o.length!==t.length)return!1;for(let e=0;e<o.length;e++)if(o[e].path!==t[e].path||o[e].kind!==t[e].kind||(o[e].parent??"")!==(t[e].parent??""))return!1;return!0}function Xo(o){if(!Array.isArray(o))return[];let t=[];for(let e of o){if(!e||typeof e!="object")continue;let r=e;if(typeof r.path!="string"||r.kind!=="folder"&&r.kind!=="file")continue;let s={path:r.path,kind:r.kind};typeof r.parent=="string"&&r.parent&&(s.parent=r.parent),t.push(s)}return t}async function ks(o,t){let e=m(t.folder);if(!e)return 0;let r=ve(t.folder,t.codeFolder??"");if(!o.vault.getAbstractFileByPath(e)&&!o.vault.getAbstractFileByPath(r))return 0;let i=je(o,e,t.codeFolder??""),a=xs(i),n=i.scanRoot,l=U(r),c=o.vault.getFileByPath(l);c||(c=await o.vault.create(l,["---",`${ys}: true`,`${ft}: ${JSON.stringify(n)}`,`${nr}: []`,"---","","# Dev Graph","","Open this note to view the folder structure graph.",""].join(`
`)));let u=o.metadataCache.getFileCache(c)?.frontmatter,f=typeof u?.[ft]=="string"?u[ft]:"",g=Xo(u?.[nr]);return f===n&&Ko(g,a)||await o.fileManager.processFrontMatter(c,h=>{let p=h;p[ys]=!0,p[ft]=n,p[nr]=a,delete p.link}),a.length}async function lr(o,t){for(let e of ne(t))await ks(o,e)}var R=require("obsidian");var gt=class{constructor(t,e){this.plugin=t;this.onOpen=e;this.entries=[]}onload(){}syncFromSettings(t){let e=[...t],r=new Set(e.map(a=>a.id));for(let a=this.entries.length-1;a>=0;a--)r.has(this.entries[a].graphId)||(this.entries[a].buttonEl.remove(),this.entries.splice(a,1));let s=new Set(this.entries.map(a=>a.graphId));for(let a of e)s.has(a.id)||this.addEntry(a);let i=new Map(e.map((a,n)=>[a.id,n]));this.entries.sort((a,n)=>(i.get(a.graphId)??0)-(i.get(n.graphId)??0));for(let a=0;a<this.entries.length;a++){let n=this.entries[a],l=e.find(u=>u.id===n.graphId),c=this.tooltipFor(l,a+1);n.buttonEl.setAttribute("aria-label",c),n.buttonEl.setAttribute("title",c),n.badgeEl.setText(String(a+1)),n.badgeEl.show()}}refreshTooltips(t){let e=[...t];for(let r=0;r<this.entries.length;r++){let s=this.entries[r],i=e.find(n=>n.id===s.graphId),a=this.tooltipFor(i,r+1);s.buttonEl.setAttribute("aria-label",a),s.buttonEl.setAttribute("title",a)}}addEntry(t){let e=t.id,r=this.plugin.addRibbonIcon("git-fork",t.name.trim()||d("customGraph.ribbonTooltip"),()=>{this.onOpen(e)});r.addClass("corvidae-custom-graph-ribbon"),r.dataset.corvidaeCustomGraphId=e;let s=r.createSpan({cls:"corvidae-custom-graph-ribbon-badge"});this.entries.push({graphId:e,buttonEl:r,badgeEl:s})}tooltipFor(t,e){let r=t?.name.trim(),s=t?m(t.folder):"";return r?`${r} (${e})`:s?`${s} (${e})`:`${d("customGraph.ribbonTooltip")} ${e}`}};var G=require("obsidian");var Zo=new Set(["ts","tsx","js","jsx","mjs","cjs"]);function ws(o){let t=o.lastIndexOf(".");return t<0?!1:Zo.has(o.slice(t+1).toLowerCase())}function Es(o){let t=[],e=new Set,r=o.split(/\r?\n/),s=[/^\s*(?:export\s+)?(?:default\s+)?(?:async\s+)?function\s+\*?\s*([A-Za-z_$][\w$]*)\s*[<(]/,/^\s*(?:export\s+)?(?:async\s+)?function\s*\*\s*([A-Za-z_$][\w$]*)\s*[<(]/,/^\s*(?:export\s+)?(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?(?:\([^)]*\)|[A-Za-z_$][\w$]*)\s*=>/,/^\s*(?:export\s+)?(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s+)?function\b/,/^\s+(?:(?:public|private|protected|static|async|readonly|override|abstract)\s+)+([A-Za-z_$][\w$]*)\s*\([^;{]*\)\s*(?::\s*[^{]+)?\s*\{/],i=new Set(["if","for","while","switch","catch","with","constructor","get","set","return","throw","typeof","instanceof","new","await","yield"]);for(let a=0;a<r.length;a++){let n=r[a];if(!(/^\s*\/\//.test(n)||/^\s*\*/.test(n))&&!/^\s*(if|for|while|switch|catch|with)\s*\(/.test(n))for(let l of s){let c=n.match(l);if(!c?.[1])continue;let u=c[1];if(i.has(u))continue;let f=`${u}@${a}`;if(!e.has(f)){e.add(f),t.push({name:u,index:t.length,line:a+1});break}}}return t}function Ts(o,t,e){return`${o}#fn:${t}@${e}`}function Ss(o){for(;o.firstChild;)o.removeChild(o.firstChild)}function mt(o){return o==="folder"?10:o==="function"?4:8}var bt=class{constructor(t,e={}){this.host=t;this.options=e;this.structural=[];this.functions=[];this.structuralEdges=[];this.functionEdges=[];this.byId=new Map;this.raf=0;this.width=800;this.height=600;this.dragged=null;this.panX=0;this.panY=0;this.scale=1;this.panning=!1;this.panStartX=0;this.panStartY=0;this.panOriginX=0;this.panOriginY=0;this.disposed=!1;this.alpha=1;this.settleLeft=0;this.linkDistance=110;this.rootId=null;this.resizeObserver=null;this.edgeEls=new Map;this.nodeEls=new Map;this.host.empty(),this.host.addClass("corvidae-custom-graph-canvas-host"),this.svg=this.host.createSvg("svg",{cls:"corvidae-custom-graph-svg",attr:{width:"100%",height:"100%"}}),this.viewport=this.svg.createSvg("g",{cls:"corvidae-custom-graph-viewport"}),this.gEdges=this.viewport.createSvg("g",{cls:"corvidae-custom-graph-edges"}),this.gNodes=this.viewport.createSvg("g",{cls:"corvidae-custom-graph-nodes"}),this.bindInput(),this.resize(),typeof ResizeObserver<"u"&&(this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(this.host))}setData(t,e){let r=new Map([...this.structural,...this.functions].map(l=>[l.id,l]));this.structural=[],this.functions=[],this.byId.clear(),this.rootId=null;let s=t.filter(l=>l.kind!=="function"),i=t.filter(l=>l.kind==="function"),a=s.find(l=>l.kind==="folder"&&!l.parentId)??s.find(l=>!l.parentId)??null;this.rootId=a?.id??null;for(let l=0;l<s.length;l++){let c=s[l],u=r.get(c.id),f=c.id===this.rootId,g=l/Math.max(s.length,1)*Math.PI*2,h=100+Math.min(s.length,50)*6,p={...c,x:f?this.width/2:u?.x??this.width/2+Math.cos(g)*h,y:f?this.height/2:u?.y??this.height/2+Math.sin(g)*h,vx:0,vy:0,fx:f?this.width/2:null,fy:f?this.height/2:null};this.structural.push(p),this.byId.set(p.id,p)}let n=new Map;for(let l of i){let c=l.parentId??l.filePath??"",u=n.get(c)??[];u.push(l),n.set(c,u)}for(let[l,c]of n){let u=this.byId.get(l),f=u?.x??this.width/2,g=u?.y??this.height/2,h=28+Math.min(c.length,24)*2.2;for(let p=0;p<c.length;p++){let v=c[p],b=r.get(v.id),y=p/c.length*Math.PI*2,x={...v,x:b?.x??f+Math.cos(y)*h,y:b?.y??g+Math.sin(y)*h,vx:0,vy:0,fx:null,fy:null};this.functions.push(x),this.byId.set(x.id,x)}}this.structuralEdges=e.filter(l=>{let c=this.byId.get(l.source),u=this.byId.get(l.target);return c&&u&&c.kind!=="function"&&u.kind!=="function"}),this.functionEdges=e.filter(l=>{let c=this.byId.get(l.source),u=this.byId.get(l.target);return!!(c&&u&&(c.kind==="function"||u.kind==="function"))}),this.alpha=1,this.settleLeft=90+Math.min(this.structural.length,80),this.rebuildDom(),this.pinRoot(),this.placeFunctions(),this.centerCameraOnRoot(),this.paint(),this.start()}resize(){let t=this.host.getBoundingClientRect();this.width=Math.max(t.width,200),this.height=Math.max(t.height,200),this.svg.setAttribute("viewBox",`0 0 ${this.width} ${this.height}`),this.pinRoot(),this.panning||this.centerCameraOnRoot()}setLinkDistance(t){let e=Math.max(40,Math.min(280,t));e!==this.linkDistance&&(this.linkDistance=e,this.wake())}getLinkDistance(){return this.linkDistance}destroy(){this.disposed=!0,this.raf&&cancelAnimationFrame(this.raf),this.raf=0,this.resizeObserver?.disconnect(),this.resizeObserver=null,this.host.empty()}bindInput(){this.svg.addEventListener("wheel",e=>{e.preventDefault();let r=e.deltaY<0?1.08:.92,s=Math.min(4,Math.max(.2,this.scale*r));if(s===this.scale)return;let i=this.getRootNode(),a=i?i.x:this.width/2,n=i?i.y:this.height/2,l=a*this.scale+this.panX,c=n*this.scale+this.panY;this.scale=s,this.panX=l-a*this.scale,this.panY=c-n*this.scale,this.applyTransform()}),this.svg.addEventListener("pointerdown",e=>{e.button!==0||e.target?.closest?.(".corvidae-custom-graph-node")||(this.panning=!0,this.panStartX=e.clientX,this.panStartY=e.clientY,this.panOriginX=this.panX,this.panOriginY=this.panY,this.svg.setPointerCapture(e.pointerId))}),this.svg.addEventListener("pointermove",e=>{if(this.dragged){let r=this.clientToWorld(e.clientX,e.clientY);this.dragged.fx=r.x,this.dragged.fy=r.y,this.dragged.x=r.x,this.dragged.y=r.y,this.dragged.kind!=="function"&&(this.placeFunctions(),this.paint()),this.wake();return}this.panning&&(this.panX=this.panOriginX+(e.clientX-this.panStartX),this.panY=this.panOriginY+(e.clientY-this.panStartY),this.applyTransform())});let t=e=>{if(this.dragged){let r=this.dragged.id===this.rootId;this.dragged.fx=null,this.dragged.fy=null,this.dragged=null,r&&this.pinRoot(),this.wake()}this.panning=!1;try{this.svg.releasePointerCapture(e.pointerId)}catch{}};this.svg.addEventListener("pointerup",t),this.svg.addEventListener("pointercancel",t)}getRootNode(){return this.rootId?this.byId.get(this.rootId)??null:null}pinRoot(){let t=this.getRootNode();t&&(t.fx=this.width/2,t.fy=this.height/2,t.x=t.fx,t.y=t.fy,t.vx=0,t.vy=0)}centerCameraOnRoot(){let t=this.getRootNode();if(!t){this.panX=0,this.panY=0,this.applyTransform();return}this.panX=this.width/2-t.x*this.scale,this.panY=this.height/2-t.y*this.scale,this.applyTransform()}wake(){this.alpha=Math.max(this.alpha,.4),this.settleLeft=90,this.start()}clientToWorld(t,e){let r=this.svg.getBoundingClientRect(),s=(t-r.left-this.panX)/this.scale,i=(e-r.top-this.panY)/this.scale;return{x:s,y:i}}applyTransform(){this.viewport.setAttribute("transform",`translate(${this.panX} ${this.panY}) scale(${this.scale})`)}rebuildDom(){Ss(this.gEdges),Ss(this.gNodes),this.edgeEls.clear(),this.nodeEls.clear();for(let t of[...this.structuralEdges,...this.functionEdges]){let e=this.byId.get(t.source)?.kind==="function"||this.byId.get(t.target)?.kind==="function",r=this.gEdges.createSvg("line",{cls:e?"corvidae-custom-graph-edge is-function":"corvidae-custom-graph-edge"}),s=`${t.source}\0${t.target}`;r.dataset.source=t.source,r.dataset.target=t.target,this.edgeEls.set(s,r)}for(let t of[...this.structural,...this.functions]){let e=this.gNodes.createSvg("g",{cls:`corvidae-custom-graph-node is-${t.kind}`});e.dataset.id=t.id,e.createSvg("circle",{cls:"corvidae-custom-graph-node-circle",attr:{r:String(mt(t.kind))}});let r=e.createSvg("text",{cls:"corvidae-custom-graph-node-label",attr:{x:String(mt(t.kind)+4),y:"4"}});if(r.textContent=t.label,t.kind==="function"){e.setAttribute("aria-label",t.label);let s=e.createSvg("title");s.textContent=t.label}e.addEventListener("pointerdown",s=>{if(s.stopPropagation(),t.kind==="function"||t.id===this.rootId)return;this.dragged=t;let i=this.clientToWorld(s.clientX,s.clientY);t.fx=i.x,t.fy=i.y,this.svg.setPointerCapture(s.pointerId),this.wake()}),e.addEventListener("click",s=>{s.stopPropagation(),this.options.onNodeClick?.(t)}),this.nodeEls.set(t.id,e)}}start(){if(this.raf)return;let t=()=>{if(this.disposed){this.raf=0;return}this.alpha>.0015||this.settleLeft>0||this.dragged?(this.step(),this.pinRoot(),this.placeFunctions(),this.paint(),this.settleLeft>0&&(this.settleLeft-=1),this.raf=window.requestAnimationFrame(t)):(this.raf=0,this.pinRoot(),this.paint())};this.raf=window.requestAnimationFrame(t)}step(){let t=this.structural,e=t.length;if(e===0){this.alpha=0;return}let r=this.alpha,s=this.linkDistance/110,i=(1400+Math.min(e,80)*22)*s*s,a=24+36*s,n=.0028/Math.sqrt(Math.max(s,.35));for(let f=0;f<e;f++)for(let g=f+1;g<e;g++){let h=t[f],p=t[g],v=h.x-p.x,b=h.y-p.y,y=v*v+b*b;y<1&&(v=(Math.random()-.5)*.5,b=(Math.random()-.5)*.5,y=v*v+b*b);let x=Math.sqrt(y),P=mt(h.kind)+mt(p.kind)+a,Z=x<P?(P-x)/x*(2.4+s)*r:i*r/y,Le=v/x*Z,_=b/x*Z;h.vx+=Le,h.vy+=_,p.vx-=Le,p.vy-=_}for(let f of this.structuralEdges){let g=this.byId.get(f.source),h=this.byId.get(f.target);if(!g||!h)continue;let p=h.x-g.x,v=h.y-g.y,b=Math.max(Math.sqrt(p*p+v*v),1),y=this.linkDistance,x=(b-y)*.05*r,P=p/b*x,Z=v/b*x;g.vx+=P,g.vy+=Z,h.vx-=P,h.vy-=Z}let l=this.getRootNode(),c=l?.x??this.width/2,u=l?.y??this.height/2;for(let f of t){if(f.id===this.rootId){f.vx=0,f.vy=0;continue}f.vx+=(c-f.x)*n*r,f.vy+=(u-f.y)*n*r,f.vx*=.82,f.vy*=.82,f.fx!==null&&f.fy!==null?(f.x=f.fx,f.y=f.fy,f.vx=0,f.vy=0):(f.x+=f.vx,f.y+=f.vy)}this.alpha*=.96}placeFunctions(){if(this.functions.length===0)return;let t=new Map;for(let e of this.functions){let r=e.parentId??e.filePath??"",s=t.get(r)??[];s.push(e),t.set(r,s)}for(let[e,r]of t){let s=this.byId.get(e);if(!s)continue;let i=r.length,a=this.linkDistance/110,n=Math.max(8,Math.ceil(Math.sqrt(i)*4));for(let l=0;l<i;l++){let c=Math.floor(l/n),u=l%n,f=Math.min(n,i-c*n),g=u/f*Math.PI*2+c*.35,h=(22+c*16+Math.min(f,16)*.6)*Math.max(a,.7),p=r[l];p.x=s.x+Math.cos(g)*h,p.y=s.y+Math.sin(g)*h}}}paint(){for(let[t,e]of this.edgeEls){let[r,s]=t.split("\0"),i=this.byId.get(r),a=this.byId.get(s);!i||!a||(e.setAttribute("x1",String(i.x)),e.setAttribute("y1",String(i.y)),e.setAttribute("x2",String(a.x)),e.setAttribute("y2",String(a.y)))}for(let[t,e]of this.nodeEls){let r=this.byId.get(t);r&&e.setAttribute("transform",`translate(${r.x} ${r.y})`)}}};var $="corvidae-custom-graph",Cs=40,Ps=280,Jo=110,Qo="braces",N=class extends G.ItemView{constructor(e,r){super(e);this.graphId="";this.showFunctions=!1;this.edgeLength=Jo;this.toolbarEl=null;this.hostEl=null;this.emptyEl=null;this.renderer=null;this.plugin=r}getViewType(){return $}getDisplayText(){return xe(this.plugin.settings.customGraphs,this.graphId)?.name.trim()||d("customGraph.viewTitle")}getIcon(){return"git-fork"}getState(){return{graphId:this.graphId,showFunctions:this.showFunctions,edgeLength:this.edgeLength}}getGraphId(){return this.graphId}async setState(e,r){await super.setState(e,r),S(e)&&(typeof e.graphId=="string"&&(this.graphId=e.graphId),typeof e.showFunctions=="boolean"&&(this.showFunctions=e.showFunctions),typeof e.edgeLength=="number"&&Number.isFinite(e.edgeLength)&&(this.edgeLength=Ls(e.edgeLength))),this.updateTabTitle(),await this.refresh()}async onOpen(){let{contentEl:e}=this;e.empty(),e.addClass("corvidae-custom-graph-view"),this.toolbarEl=e.createDiv({cls:"corvidae-custom-graph-toolbar"}),this.emptyEl=e.createDiv({cls:"corvidae-custom-graph-empty"}),this.hostEl=e.createDiv({cls:"corvidae-custom-graph-host"}),this.renderToolbar(),this.updateTabTitle(),await this.refresh()}async onClose(){this.renderer?.destroy(),this.renderer=null,this.toolbarEl=null,this.hostEl=null,this.emptyEl=null,this.contentEl.empty()}async refresh(){if(!this.hostEl||!this.emptyEl||!this.toolbarEl)return;this.updateTabTitle(),this.renderToolbar();let e=xe(this.plugin.settings.customGraphs,this.graphId),r=e?m(e.folder):"";if(!r){this.renderer?.destroy(),this.renderer=null,this.hostEl.hide(),this.emptyEl.show(),this.emptyEl.empty(),this.emptyEl.createEl("p",{text:d("customGraph.empty")});return}this.emptyEl.hide(),this.hostEl.show();let s=je(this.plugin.app,r,e?.codeFolder??""),i=s.nodes.slice(),a=s.edges.slice();if(this.showFunctions){let n=await this.loadFunctionNodes(i);i=i.concat(n.nodes),a=a.concat(n.edges)}this.renderer||(this.renderer=new bt(this.hostEl,{onNodeClick:n=>{this.handleNodeClick(n)}})),this.renderer.setLinkDistance(this.edgeLength),this.renderer.setData(i,a),this.renderer.resize()}updateTabTitle(){let e=this.getDisplayText(),r=this.leaf;r.updateHeader?.(),r.tabHeaderInnerTitleEl&&r.tabHeaderInnerTitleEl.setText(e)}renderToolbar(){if(!this.toolbarEl)return;this.toolbarEl.empty();let e=this.toolbarEl.createEl("button",{cls:"corvidae-custom-graph-bonus-btn",attr:{type:"button","aria-label":this.showFunctions?d("customGraph.bonus.on"):d("customGraph.bonus.off"),title:this.showFunctions?d("customGraph.bonus.on"):d("customGraph.bonus.off"),"aria-pressed":this.showFunctions?"true":"false"}});this.showFunctions&&e.addClass("is-active"),(0,G.setIcon)(e,Qo),e.addEventListener("click",()=>{this.showFunctions=!this.showFunctions,this.refresh()});let r=this.toolbarEl.createDiv({cls:"corvidae-custom-graph-edge-control"});r.createEl("label",{cls:"corvidae-custom-graph-edge-label",text:d("customGraph.edgeLength"),attr:{for:"corvidae-cg-edge-length"}});let s=r.createEl("input",{cls:"corvidae-custom-graph-edge-slider",attr:{id:"corvidae-cg-edge-length",type:"range",min:String(Cs),max:String(Ps),step:"5",value:String(this.edgeLength),"aria-label":d("customGraph.edgeLength")}});s.addEventListener("input",()=>{this.edgeLength=Ls(Number(s.value)),this.renderer?.setLinkDistance(this.edgeLength),this.app.workspace.requestSaveLayout()})}async loadFunctionNodes(e){let r=[],s=[];for(let i of e){if(i.kind!=="file"||!ws(i.path))continue;let a=this.plugin.app.vault.getFileByPath(i.path);if(a instanceof G.TFile)try{let n=await this.plugin.app.vault.cachedRead(a),l=Es(n);for(let c of l){let u=Ts(i.path,c.name,c.index);r.push({id:u,path:u,label:c.name,kind:"function",parentId:i.id,filePath:i.path}),s.push({source:i.id,target:u})}}catch{}}return{nodes:r,edges:s}}async handleNodeClick(e){if(e.kind==="file"){let r=this.plugin.app.vault.getFileByPath(e.path);r instanceof G.TFile&&await this.plugin.app.workspace.getLeaf(!1).openFile(r,{active:!0});return}if(e.kind==="function"&&e.filePath){let r=this.plugin.app.vault.getFileByPath(e.filePath);r instanceof G.TFile&&await this.plugin.app.workspace.getLeaf(!1).openFile(r,{active:!0});return}if(e.kind==="folder"){let r=this.plugin.app.vault.getAbstractFileByPath(e.path);r&&this.plugin.app.workspace.getLeavesOfType("file-explorer")[0]?.view?.revealInFolder?.(r)}}},qe=class extends G.FuzzySuggestModal{constructor(e,r){super(e.app);this.plugin=e;this.onPick=r;this.setPlaceholder(d("customGraph.pickPlaceholder"))}getItems(){return ne(this.plugin.settings.customGraphs)}getItemText(e){let r=e.name.trim(),s=m(e.folder);return r&&s?`${r} (${s})`:r||s}onChooseItem(e){this.onPick(e)}};function Ls(o){return Math.max(Cs,Math.min(Ps,Math.round(o)))}var Ye=class{constructor(t){this.plugin=t;this.syncTimer=null;this.syncing=!1;this.openingDevMd=!1;this.ribbon=new gt(t,e=>{this.openGraph(e)})}onload(){this.ribbon.onload(),this.updateRibbon(),this.plugin.registerEvent(this.plugin.app.vault.on("create",t=>{this.onVaultChange(t)})),this.plugin.registerEvent(this.plugin.app.vault.on("delete",t=>{this.onVaultChange(t)})),this.plugin.registerEvent(this.plugin.app.vault.on("rename",(t,e)=>{this.onVaultChange(t)})),this.plugin.registerEvent(this.plugin.app.workspace.on("file-open",t=>{if(!t||this.openingDevMd)return;let e=Ue(t.path,this.plugin.settings.customGraphs);e&&this.openGraphReplacingActiveLeaf(e)})),this.plugin.registerEvent(this.plugin.app.workspace.on("active-leaf-change",t=>{if(!t||this.openingDevMd)return;let e=t.view;if(!(e instanceof R.MarkdownView)||!e.file)return;let r=Ue(e.file.path,this.plugin.settings.customGraphs);r&&this.openGraphReplacingActiveLeaf(r)})),this.plugin.registerDomEvent(document,"click",t=>{this.onExplorerDevClick(t)},{capture:!0}),this.plugin.app.workspace.onLayoutReady(()=>{this.syncAndRefresh()})}onLanguageChanged(){this.ribbon.refreshTooltips(this.plugin.settings.customGraphs),this.refreshOpenViews()}onSettingsChanged(){this.updateRibbon(),this.scheduleSync(),this.refreshOpenViews()}scheduleSync(){this.syncTimer!==null&&window.clearTimeout(this.syncTimer),this.syncTimer=window.setTimeout(()=>{this.syncTimer=null,this.syncAndRefresh()},300)}async syncAndRefresh(){if(this.syncing){this.scheduleSync();return}this.syncing=!0;try{await lr(this.plugin.app,this.plugin.settings.customGraphs),this.updateRibbon(),await this.refreshOpenViews(),this.plugin.explorerManager.scheduleFolderRefresh()}finally{this.syncing=!1}}updateRibbon(){this.ribbon.syncFromSettings(this.plugin.settings.customGraphs)}async activate(){let t=ne(this.plugin.settings.customGraphs);if(t.length===0){new R.Notice(d("customGraph.notice.noFolder"));return}if(t.length===1){await this.openGraph(t[0].id);return}new qe(this.plugin,e=>{this.openGraph(e.id)}).open()}async openGraph(t){let e=xe(this.plugin.settings.customGraphs,t);if(!e||!m(e.folder)){new R.Notice(d("customGraph.notice.noFolder"));return}await this.syncAndRefresh();let r=this.plugin.app.workspace.getLeavesOfType($).find(i=>{let a=i.view;return a instanceof N&&a.getGraphId()===t});if(r){await this.plugin.app.workspace.revealLeaf(r),r.view instanceof N&&(await r.view.refresh(),r.view.updateTabTitle());return}let s=this.plugin.app.workspace.getLeaf(!0);await s.setViewState({type:$,state:{graphId:t},active:!0}),s.view instanceof N&&s.view.updateTabTitle()}onExplorerDevClick(t){if(t.button!==0||t.shiftKey)return;let e=t.target;if(!(e instanceof Element)||!e.closest(".nav-files-container")||e.closest(".nav-folder-collapse-indicator, .tree-item-icon.collapse-icon"))return;let r=this.plugin.settings.customGraphs,s=e.closest(".nav-file-title[data-path], .tree-item-self.nav-file-title[data-path]");if(s?.dataset.path){let c=Ue(s.dataset.path,r);c&&(t.preventDefault(),t.stopPropagation(),this.openGraph(c));return}let a=e.closest(".nav-folder-title[data-path], .tree-item-self.nav-folder-title[data-path], .tree-item-self[data-path]")?.dataset.path;if(!a||!(this.plugin.app.vault.getAbstractFileByPath(a)instanceof R.TFolder))return;let l=ar(a,r);l&&(t.preventDefault(),t.stopPropagation(),this.openGraph(l))}async openGraphReplacingActiveLeaf(t){if(!this.openingDevMd){this.openingDevMd=!0;try{let r=this.plugin.app.workspace.getActiveViewOfType(R.MarkdownView)?.leaf??this.plugin.app.workspace.getLeaf(!1);await r.setViewState({type:$,state:{graphId:t},active:!0}),r.view instanceof N&&r.view.updateTabTitle(),this.syncAndRefresh()}finally{this.openingDevMd=!1}}}onVaultChange(t){let e=ne(this.plugin.settings.customGraphs);if(e.length===0||t instanceof R.TFile&&le(t.path,e))return;let r=t.path;for(let s of e){let i=m(s.folder),a=ie(i,s.codeFolder??""),n=[i,a].filter(Boolean);for(let l of n){let c=`${l}/`;if(r===l||r.startsWith(c)){this.scheduleSync();return}if(t instanceof R.TFolder&&l.startsWith(`${r}/`)){this.scheduleSync();return}}}}async refreshOpenViews(){for(let t of this.plugin.app.workspace.getLeavesOfType($))t.view instanceof N&&(await t.view.refresh(),t.view.updateTabTitle())}};var Fs=require("obsidian"),ei="allow-scripts allow-popups allow-forms",As="corvidae-html-height",Ds="corvidae-html-scroll",Is=2,ti=50,ri=12,dr=`<style data-corvidae-html-embed>
html, body {
	height: auto !important;
	min-height: 0 !important;
	overflow: visible !important;
	margin: 0;
}
</style>`,Ms=`<script data-corvidae-html-bridge>
(function () {
	var HEIGHT_TYPE = ${JSON.stringify(As)};
	var SCROLL_TYPE = ${JSON.stringify(Ds)};
	var timer = null;
	var lastSent = -1;

	function contentBottom() {
		var body = document.body;
		if (!body) return 0;
		var max = 0;
		var nodes = body.children;
		for (var i = 0; i < nodes.length; i++) {
			var el = nodes[i];
			if (!(el instanceof Element)) continue;
			var rect = el.getBoundingClientRect();
			var top = rect.top + (window.pageYOffset || document.documentElement.scrollTop || 0);
			max = Math.max(max, top + rect.height);
		}
		return max;
	}

	function measure() {
		var doc = document.documentElement;
		var body = document.body;
		var h = Math.max(
			doc ? doc.scrollHeight : 0,
			body ? body.scrollHeight : 0,
			contentBottom()
		);
		h = Math.ceil(h);
		if (h < 0 || !isFinite(h)) return;
		if (lastSent >= 0 && Math.abs(h - lastSent) < ${Is}) return;
		lastSent = h;
		parent.postMessage({ type: HEIGHT_TYPE, height: h }, "*");
	}

	function schedule() {
		if (timer !== null) clearTimeout(timer);
		timer = setTimeout(function () {
			timer = null;
			requestAnimationFrame(function () {
				requestAnimationFrame(measure);
			});
		}, ${ti});
	}

	function offsetTopInDocument(el) {
		var rect = el.getBoundingClientRect();
		return rect.top + (window.pageYOffset || document.documentElement.scrollTop || 0);
	}

	function onHashClick(event) {
		var node = event.target;
		while (node && node !== document && !(node instanceof HTMLAnchorElement)) {
			node = node.parentElement;
		}
		if (!(node instanceof HTMLAnchorElement)) return;
		var href = node.getAttribute("href");
		if (!href || href.charAt(0) !== "#") return;
		var id = href.slice(1);
		if (!id) return;
		var target = document.getElementById(id);
		if (!target) return;
		event.preventDefault();
		parent.postMessage(
			{ type: SCROLL_TYPE, top: Math.max(0, offsetTopInDocument(target)) },
			"*"
		);
	}

	function startObservers() {
		document.addEventListener("click", onHashClick, true);
		if (typeof ResizeObserver !== "undefined" && document.body) {
			new ResizeObserver(schedule).observe(document.body);
		}
		if (typeof MutationObserver !== "undefined" && document.documentElement) {
			new MutationObserver(schedule).observe(document.documentElement, {
				childList: true,
				subtree: true,
				attributes: true,
				characterData: true,
			});
		}
		schedule();
	}

	if (document.readyState === "complete") {
		startObservers();
	} else {
		window.addEventListener("load", startObservers);
	}
})();
<\/script>`;function si(o){let t=o;return/<\/head>/i.test(t)?t=t.replace(/<\/head>/i,`${dr}</head>`):/<body\b/i.test(t)?t=t.replace(/<body\b[^>]*>/i,e=>`${dr}${e}`):t=dr+t,/<\/body>/i.test(t)?t.replace(/<\/body>/i,`${Ms}</body>`):t+Ms}function oi(o){let t=o.parentElement;for(;t;){let r=getComputedStyle(t).overflowY;if((r==="auto"||r==="scroll"||r==="overlay")&&t.scrollHeight>t.clientHeight+1)return t;t=t.parentElement}return o.ownerDocument.scrollingElement??o.ownerDocument.documentElement}var vt=class extends Fs.MarkdownRenderChild{constructor(e,r){super(e);this.source=r;this.blobUrl=null;this.iframe=null;this.lastAppliedHeight=-1;this.onMessage=e=>{if(!this.iframe||e.source!==this.iframe.contentWindow)return;let r=e.data;if(!r||typeof r!="object")return;let s=r,i=s.type;if(i===As){this.applyHeight(s.height);return}i===Ds&&this.scrollNoteToOffset(s.top)}}onload(){this.containerEl.empty(),this.containerEl.addClass("corvidae-html-embed");let e=si(this.source),r=new Blob([e],{type:"text/html"});this.blobUrl=URL.createObjectURL(r);let s=createEl("iframe",{cls:"corvidae-html-iframe",attr:{sandbox:ei,title:"CORVIDAE HTML",scrolling:"no"}});s.src=this.blobUrl,this.iframe=s,this.containerEl.appendChild(s),window.addEventListener("message",this.onMessage)}onunload(){window.removeEventListener("message",this.onMessage),this.iframe=null,this.lastAppliedHeight=-1,this.blobUrl&&(URL.revokeObjectURL(this.blobUrl),this.blobUrl=null),this.containerEl.empty(),this.containerEl.removeClass("corvidae-html-embed")}applyHeight(e){if(!this.iframe||typeof e!="number"||!Number.isFinite(e)||e<0)return;let r=Math.ceil(e);this.lastAppliedHeight>=0&&Math.abs(r-this.lastAppliedHeight)<Is||(this.lastAppliedHeight=r,this.iframe.style.height=`${r}px`)}scrollNoteToOffset(e){if(!this.iframe||typeof e!="number"||!Number.isFinite(e)||e<0)return;let r=oi(this.iframe),s=this.iframe.getBoundingClientRect(),i=r.getBoundingClientRect(),a=r.scrollTop+(s.top-i.top)+e-ri;r.scrollTo({top:Math.max(0,a),behavior:"smooth"})}};var ii="corvidaehtml";function cr(o){o.registerMarkdownCodeBlockProcessor(ii,(t,e,r)=>{e.empty(),r.addChild(new vt(e,t))})}var ye=require("obsidian");var Bs="=",ai=/^=\s*(SUM|SUMME)\s*(?:\(\s*(ABOVE|OBERHALB)?\s*\))?\s*$/i,ni=/^(?:<<|«)$/,li=/^(?:\^\^|↑)$/,di=/€|EUR/i,Ns=/^[-–—−]+$/;function Ke(o){let t=o.trim();for(let e=0;e<4;e++){let r=t.replace(/^\*{1,3}([\s\S]+?)\*{1,3}$/,"$1").replace(/^_{1,2}([\s\S]+?)_{1,2}$/,"$1").replace(/^`+([\s\S]+?)`+$/,"$1").trim();if(r===t)break;t=r}return t}var ci=new Intl.NumberFormat("de-DE",{style:"currency",currency:"EUR"});function pr(o){return Ke(o).startsWith(Bs)}function Xe(o){let t=Ke(o);return t.length>0&&Ns.test(t)}function hr(o){let t=Ke(o);return!t||Xe(t)?null:ni.test(t)?"left":li.test(t)?"up":null}function xt(o){return hr(o)!==null}function Rs(o){let t=Ke(o);return t.startsWith(Bs)?ai.test(t)?"sum":"unknown":null}function Os(o){return di.test(o)}function ur(o){return ci.format(o)}function fr(o){let t=Ke(o);if(!t||pr(t)||xt(t)||Xe(t))return null;let e=t.replace(/EUR/gi,"").replace(/€/g,"").replace(/\u00a0/g,"").replace(/\s/g,"");if(!e)return null;let r=1;if(e.startsWith("+")?e=e.slice(1):e.startsWith("-")&&(r=-1,e=e.slice(1)),!e||Ns.test(e))return null;let s=e.lastIndexOf(","),i=e.lastIndexOf("."),a=e;if(s>=0&&i>=0)s>i?a=e.replace(/\./g,"").replace(",","."):a=e.replace(/,/g,"");else if(s>=0){let l=e.length-s-1;l===1||l===2?a=e.replace(",","."):a=e.replace(/,/g,"")}else if(i>=0){let l=e.length-i-1;l!==1&&l!==2&&(a=e.replace(/\./g,""))}if(!/^\d+(\.\d+)?$/.test(a))return null;let n=Number(a)*r;return Number.isFinite(n)?n:null}var Ze="corvidae-tables-side",kt="corvidae-tables-side-col",wt="corvidae-tables-side-item",gr="corvidae-tables-side-gap",br="corvidae-tables-side-clear";function mr(o){if(!o.instanceOf(HTMLElement)||o.classList.contains(br))return!0;if(o.classList.contains(Ze)||o.classList.contains(kt)||o.classList.contains(wt)||o.classList.contains("el-table"))return!1;let t=o.tagName;return t==="BR"||t==="HR"?!0:o.classList.contains("el-p")||t==="P"||t==="DIV"||t==="SPAN"?o.querySelector("table, img, video, iframe, pre, .el-table, ul, ol, blockquote")?!1:!(o.textContent??"").trim():!1}function pi(o){return o.classList.contains("el-table")||o.tagName==="TABLE"?!0:o.children.length===1&&o.children[0].instanceOf(HTMLTableElement)&&!o.classList.contains("markdown-preview-sizer")}function hi(o){if(/^H[1-6]$/.test(o.tagName))return!0;for(let t=1;t<=6;t++)if(o.classList.contains(`el-h${t}`))return!0;if(o.querySelector(":scope > h1, :scope > h2, :scope > h3, :scope > h4, :scope > h5, :scope > h6"))return!0;if(o.classList.contains("el-p")||o.tagName==="P"){if(o.querySelector("table, ul, ol, pre, blockquote, .el-table, p, div"))return!1;let t=(o.textContent??"").trim();return!(!t||/^[-–—−]+$/.test(t)||t.length>100||t.includes(`
`))}return!1}function yt(o){o.removeClass(wt),o.style.removeProperty("width"),o.style.removeProperty("max-width"),o.style.removeProperty("margin-right"),o.style.removeProperty("flex"),o.style.removeProperty("min-width"),o.style.removeProperty("display"),o.style.removeProperty("vertical-align"),o.style.removeProperty("box-sizing")}function ui(o){let t=o.instanceOf(Element)?o:null,e=r=>t?t.querySelectorAll(r):o.querySelectorAll?.(r)??[];e(`.${kt}`).forEach(r=>{if(!r.instanceOf(HTMLElement))return;let s=r.parentElement;if(s){for(;r.firstChild;){let i=r.firstChild;i.instanceOf(HTMLElement)&&yt(i),s.insertBefore(i,r)}r.remove()}}),e(`.${Ze}`).forEach(r=>{if(!r.instanceOf(HTMLElement))return;let s=r.parentElement;if(s){for(;r.firstChild;){let i=r.firstChild;if(i.instanceOf(HTMLElement))if(i.classList.contains(kt)){for(;i.firstChild;){let a=i.firstChild;a.instanceOf(HTMLElement)&&yt(a),s.insertBefore(a,r)}i.remove()}else yt(i),s.insertBefore(i,r);else s.insertBefore(i,r)}r.remove()}}),e(`.${br}`).forEach(r=>r.remove()),e(`.${gr}`).forEach(r=>{r.instanceOf(HTMLElement)&&r.removeClass(gr)}),e(`.${wt}`).forEach(r=>{r.instanceOf(HTMLElement)&&yt(r)})}function Gs(o,t){let e=t,r=[],s=[];for(;e<o.length&&mr(o[e]);)r.push(o[e]),e++;if(e>=o.length)return null;if(hi(o[e]))for(s.push(o[e]),e++;e<o.length&&mr(o[e]);)r.push(o[e]),e++;return e>=o.length||!pi(o[e])?null:(s.push(o[e]),e++,{col:{blocks:s,gaps:r},next:e})}function fi(o){if(o.length<2)return;let t=o[0].blocks[0],e=t.parentElement;if(!e||e.classList.contains(Ze))return;let r=e.createDiv({cls:Ze});r.style.setProperty("gap","8px"),e.insertBefore(r,t);for(let s of o){for(let a of s.gaps)a.addClass(gr);let i=r.createDiv({cls:kt});for(let a of s.blocks)a.addClass(wt),i.appendChild(a)}}function Hs(o){let t=Array.from(o.children).filter(r=>r.instanceOf(HTMLElement)&&!r.classList.contains(br)),e=0;for(;e<t.length;){if(t[e].classList.contains(Ze)){e++;continue}let r=[],s=e,i=Gs(t,s);for(;i;){for(r.push(i.col),s=i.next;s<t.length&&mr(t[s]);)r[r.length-1].gaps.push(t[s]),s++;i=Gs(t,s)}if(r.length>=2)return fi(r),Hs(o);e++}}function Vs(o){ui(o);let t=[];if(o.instanceOf(HTMLElement)){let r=o;r.classList.contains("markdown-preview-sizer")&&r.closest(".markdown-preview-view")&&!r.closest(".markdown-source-view, .cm-editor")&&t.push(r),r.querySelectorAll(".markdown-preview-view .markdown-preview-sizer").forEach(s=>{s.instanceOf(HTMLElement)&&(s.closest(".markdown-source-view, .cm-editor")||t.push(s))})}let e=new Set;for(let r of t)e.has(r)||(e.add(r),Hs(r))}var _s="corvidae-table-cell",xr="corvidae-table-src",Tt="corvidae-table-display",te="corvidae-table-merged-away",yr="corvidae-table-merge-anchor",gi="#NAME?";function q(o){return!!o.closest(".markdown-source-view, .cm-editor, .cm-table-widget, .cm-content, .cm-scroller")}function Ws(o){return q(o)?!1:!!o.closest(".markdown-preview-view")}function mi(o){let t=o.containerEl.querySelector(".markdown-preview-view");return t?.instanceOf(HTMLElement)?t:null}function St(o){return q(o),o}function kr(o){let t=o.querySelector(`:scope > .${xr}`);return t?(t.textContent??"").trim():(o.textContent??"").trim()}function zs(o,t){if(q(o))return;let e=o.querySelector(`:scope > .${xr}`),r=o.querySelector(`:scope > .${Tt}`),s=e?.instanceOf(HTMLElement)?e:null,i=r?.instanceOf(HTMLElement)?r:null;if(!(s&&i&&o.hasClass(_s)&&i.textContent===t)){if(!s){let a=Array.from(o.childNodes);o.empty(),s=o.createSpan({cls:xr});for(let n of a)s.appendChild(n);i=o.createSpan({cls:Tt}),o.addClass(_s)}i||(i=o.createSpan({cls:Tt}),o.appendChild(i)),i.textContent!==t&&i.setText(t)}}function js(o){if(o.tagName==="TH")return!0;let t=o.parentElement;if(!(t instanceof HTMLTableRowElement))return!1;let e=t.parentElement;return e instanceof HTMLTableSectionElement&&e.tagName==="THEAD"}function Je(o){return Array.from(o.rows)}function bi(o){let t=Je(o);for(let e of t)for(let r=0;r<e.cells.length;r++){let s=e.cells[r];s.removeClass(te),s.removeClass(yr),s.removeAttribute("colspan"),s.removeAttribute("rowspan")}}function vi(o,t){for(let e=t-1;e>=0;e--){let r=o.cells[e];if(!(!r||r.hasClass(te)))return r}return null}function xi(o,t,e){for(let r=t-1;r>=0;r--){let s=o[r]?.cells[e];if(!(!s||s.hasClass(te)))return s}return null}function yi(o){if(q(o))return;bi(o);let t=Je(o);for(let e=0;e<t.length;e++){let r=t[e];for(let s=0;s<r.cells.length;s++){let i=r.cells[s],a=kr(St(i)),n=hr(a);if(n===null)continue;if(n==="left"){let c=vi(r,s);if(!c)continue;c.colSpan=(c.colSpan||1)+1,c.addClass(yr),i.addClass(te);continue}let l=xi(t,e,s);l&&(l.rowSpan=(l.rowSpan||1)+1,l.addClass(yr),i.addClass(te))}}}function ki(o,t,e){let r=0,s=Je(o);for(let i=0;i<t;i++){let n=s[i].cells[e];if(!n||n.hasClass(te)||js(n))continue;let l=kr(St(n));if(pr(l)||xt(l)||Xe(l))continue;let c=fr(l);c!==null&&(r+=c)}return r}function wi(o){if(q(o))return;let t=Je(o);for(let e=0;e<t.length;e++){let r=t[e];for(let s=0;s<r.cells.length;s++){let i=r.cells[s];if(i.hasClass(te))continue;let a=St(i),n=kr(a);if(!n||xt(n))continue;if(Xe(n)){i.addClass("corvidae-table-empty-col");continue}let l=Rs(n);if(l!==null){if(js(i))continue;zs(a,l==="sum"?ur(ki(o,e,s)):gi);continue}if(Os(n)){let c=fr(n);if(c===null)continue;zs(a,ur(c))}}}}function Ei(o){if(q(o))return;let t=Je(o);for(let e of t)for(let r=0;r<e.cells.length;r++){let s=e.cells[r];if(s.hasClass(te)||s.hasClass("corvidae-table-empty-col"))continue;let i=St(s);i.querySelector(`:scope > .${Tt}`)||(i.textContent??"").replace(/\u00a0/g," ").trim().length>0||i.querySelector("img, svg, video, iframe, input, br")||(i.querySelector(":scope > .corvidae-table-empty-keep")||(i.empty(),i.createSpan({cls:"corvidae-table-empty-keep"}).setText("\xA0")),s.addClass("corvidae-table-empty-col"))}}function Ti(o){q(o)||Ws(o)&&(yi(o),wi(o),Ei(o))}function Si(o){if(q(o)||!o.classList.contains("markdown-preview-view")&&!o.closest(".markdown-preview-view"))return;Vs(o);let t=o.querySelectorAll("table");for(let e=0;e<t.length;e++){let r=t.item(e);r?.instanceOf(HTMLTableElement)&&(r.closest(".corvidae-html-embed")||Ti(r))}}var vr=!1,Et=null;function Li(o){if(!vr){vr=!0;try{o.app.workspace.iterateAllLeaves(t=>{if(!(t.view instanceof ye.MarkdownView)||t.view.getMode()!=="preview")return;let e=mi(t.view);e&&Si(e)})}finally{vr=!1}}}function wr(o){let t=null,e=(i=80)=>{let a=o.app.workspace.getActiveViewOfType(ye.MarkdownView);!a||a.getMode()!=="preview"||(t!==null&&window.clearTimeout(t),t=window.setTimeout(()=>{t=null,Li(o)},i))},r=()=>{let a=o.app.workspace.getActiveViewOfType(ye.MarkdownView)?.getMode?.()??null;a==="preview"&&(e(a!==Et?0:100),a!==Et&&(window.setTimeout(()=>e(0),120),window.setTimeout(()=>e(0),400))),Et=a};o.registerMarkdownPostProcessor((i,a)=>{if(q(i)||!Ws(i))return;let n=o.app.workspace.getActiveViewOfType(ye.MarkdownView);!n||n.getMode()!=="preview"||!(i.closest(".markdown-preview-view")instanceof HTMLElement)||e(50)}),o.registerEvent(o.app.workspace.on("layout-change",r)),o.registerEvent(o.app.workspace.on("active-leaf-change",r)),o.registerEvent(o.app.workspace.on("file-open",()=>{Et=null,r()}));let s=new MutationObserver(()=>{let i=o.app.workspace.getActiveViewOfType(ye.MarkdownView);!i||i.getMode()!=="preview"||e(150)});s.observe(o.app.workspace.containerEl,{childList:!0,subtree:!0}),o.register(()=>{s.disconnect(),t!==null&&window.clearTimeout(t)}),o.app.workspace.onLayoutReady(()=>r()),r()}var H=require("obsidian");var Er="corvidae-nav-file-tag";function Tr(o,t,e=[]){return t.extension==="base"?null:Lt(o,t)?"DRAW":le(t.path,e)?"DEV":t.extension==="md"&&!L(t.path)?"NOTE":null}function Sr(o,t,e=[]){return oe(t.path,e)?"DEV":T(o,t)?"HYBRID":"FOLDER"}function Lt(o,t){if(t.path.endsWith(".excalidraw.md"))return!0;let e=o.metadataCache.getFileCache(t)?.frontmatter;if(!e)return!1;if(e["excalidraw-plugin"]!==void 0)return!0;let r=e.tags;return!!(Array.isArray(r)&&r.some(s=>String(s).toLowerCase()==="excalidraw")||typeof r=="string"&&r.toLowerCase().includes("excalidraw"))}function Ct(o,t){let e=o.querySelector(`.nav-file-tag.${Er}`);if(!t){e?.remove();return}let r=e??o.createDiv({cls:`nav-file-tag ${Er}`});r.textContent=Ur(t)}function Pt(){document.querySelectorAll(`.nav-file-tag.${Er}`).forEach(o=>o.remove())}var Mt=require("obsidian");var Us={sensitivity:"base",numeric:!0};function $s(o,t){let e=o.vault.getAbstractFileByPath(t);if(e instanceof Mt.TFile){let s=o.metadataCache.getFileCache(e)?.frontmatter;return z(s,e.basename)}if(e instanceof Mt.TFolder){let s=T(o,e);if(s){let i=o.metadataCache.getFileCache(s)?.frontmatter;return z(i,e.name)}return e.name}return(t.split("/").pop()??t).replace(/\.[^./]+$/,"")}function qs(o,t,e){let r=$s(o,t).localeCompare($s(o,e),void 0,Us);return r!==0?r:t.localeCompare(e,void 0,Us)}var ke=Symbol("corvidae-original-getSortedFolderItems"),Ft=class{constructor(t,e,r){this.app=t;this.shouldHideFolderNotes=e;this.getDevelopmentFolders=r;this.uninstall=null;this.sortRefreshTimer=null}install(){if(this.uninstall)return!0;let t=this.getFileExplorerLeaf();if(!t?.view||t.isDeferred)return!1;let e=Object.getPrototypeOf(t.view),r=Reflect.get(e,"getSortedFolderItems");if(typeof r!="function"||ke in e)return!1;let s=this.app,i=this.shouldHideFolderNotes,a=this.getDevelopmentFolders;return e[ke]=r,e.getSortedFolderItems=function(n){if(Zt(n.path,a()))return[];let c=(e[ke].call(this,n)??[]).filter(u=>{let f=u?.file?.path;return f?!(i()&&L(f)):!0});return c.sort((u,f)=>{let g=u?.file?.path??"",h=f?.file?.path??"";return qs(s,g,h)}),c},this.uninstall=()=>{ke in e&&(e.getSortedFolderItems=e[ke],delete e[ke]),this.uninstall=null},!0}uninstallPatch(){this.uninstall?.(),this.sortRefreshTimer!==null&&(window.clearTimeout(this.sortRefreshTimer),this.sortRefreshTimer=null)}scheduleSortRefresh(){this.sortRefreshTimer!==null&&window.clearTimeout(this.sortRefreshTimer),this.sortRefreshTimer=window.setTimeout(()=>{this.sortRefreshTimer=null,this.refreshExplorerSort()},200)}async refreshExplorerSort(){await this.ensureFileExplorerReady(),this.install(),this.requestSort(),window.setTimeout(()=>this.requestSort(),100)}tryInstallAndSort(){this.refreshExplorerSort()}requestSort(){for(let t of this.app.workspace.getLeavesOfType("file-explorer")){if(t.isDeferred)continue;let e=t.view;e?.requestSort?.(),e?.infinityScroll?.invalidate?.()}}async ensureFileExplorerReady(){for(let t of this.app.workspace.getLeavesOfType("file-explorer"))t.isDeferred&&await t.loadIfDeferred()}getFileExplorerLeaf(){return this.app.workspace.getLeavesOfType("file-explorer")[0]}};var Lr="corvidae-folder-note",At="corvidae-folder-note-hidden",Cr="corvidae-dev-sealed";function Pr(o){return o!==null&&o.instanceOf?.(HTMLElement)===!0}var Qe=class{constructor(t,e,r){this.app=t;this.plugin=e;this.settings=r;this.observer=null;this.folderRefreshTimer=null;this.onClick=t=>{if(this.isCollapseClick(t.target)&&this.isSealedFolderClick(t.target)){t.preventDefault(),t.stopPropagation();return}if(!this.folderClickEnabled()||t.shiftKey||t.button!==0||this.isCollapseClick(t.target)||!this.isFolderTitleClick(t.target))return;let e=this.getFolderFromClick(t.target);if(!e||!T(this.app,e))return;let r=t.ctrlKey||t.metaKey;window.setTimeout(()=>void this.openFolderNote(e,r),0)};this.onAuxClick=t=>{if(!this.folderClickEnabled()||t.button!==1||this.isCollapseClick(t.target)||!this.isFolderTitleClick(t.target))return;let e=this.getFolderFromClick(t.target);!e||!T(this.app,e)||window.setTimeout(()=>void this.openFolderNote(e,!0),0)};this.fileExplorerPatch=new Ft(this.app,()=>this.hideEnabled(),()=>this.settings.developmentFolders)}onload(){this.plugin.registerDomEvent(document,"click",this.onClick,{capture:!0}),this.plugin.registerDomEvent(document,"auxclick",this.onAuxClick,{capture:!0}),this.plugin.registerEvent(this.app.workspace.on("layout-change",()=>{this.fileExplorerPatch.tryInstallAndSort(),this.hideAllFolderNotes(),this.scheduleFolderRefresh()})),this.plugin.registerEvent(this.app.vault.on("create",t=>{t instanceof H.TFile&&this.hideFolderNotePath(t.path),this.scheduleFolderRefresh()})),this.plugin.registerEvent(this.app.vault.on("delete",()=>this.scheduleFolderRefresh())),this.plugin.registerEvent(this.app.vault.on("rename",t=>{t instanceof H.TFile&&this.hideFolderNotePath(t.path),this.scheduleFolderRefresh()})),this.plugin.registerEvent(this.app.metadataCache.on("changed",t=>{this.scheduleFolderRefresh(),t instanceof H.TFile&&this.fileExplorerPatch.scheduleSortRefresh()})),this.plugin.registerEvent(this.app.metadataCache.on("resolved",()=>{this.scheduleFolderRefresh(),this.fileExplorerPatch.scheduleSortRefresh()})),this.plugin.registerEvent(this.app.vault.on("modify",t=>{t instanceof H.TFile&&t.extension==="md"&&this.fileExplorerPatch.scheduleSortRefresh()})),this.app.workspace.onLayoutReady(()=>{for(let t of[0,150,750])window.setTimeout(()=>{this.fileExplorerPatch.tryInstallAndSort()},t)}),this.plugin.registerEvent(this.app.workspace.on("active-leaf-change",t=>{!t||t.view.getViewType()!=="file-explorer"||this.fileExplorerPatch.tryInstallAndSort()})),this.setupObserver(),this.fileExplorerPatch.tryInstallAndSort(),this.hideAllFolderNotes(),this.refreshExplorerUi()}onunload(){this.observer?.disconnect(),this.observer=null,this.folderRefreshTimer!==null&&(window.clearTimeout(this.folderRefreshTimer),this.folderRefreshTimer=null),this.fileExplorerPatch.uninstallPatch(),this.clearAllMarks()}updateSettings(t){this.settings=t,this.settings.folderNoteHideInExplorer?this.hideAllFolderNotes():this.unhideAllFolderNotes(),this.fileExplorerPatch.requestSort(),this.fileExplorerPatch.scheduleSortRefresh(),this.scheduleFolderRefresh()}scheduleFolderRefresh(){this.folderRefreshTimer!==null&&window.clearTimeout(this.folderRefreshTimer),this.folderRefreshTimer=window.setTimeout(()=>{this.folderRefreshTimer=null,this.refreshExplorerUi()},50)}hideEnabled(){return this.settings.folderNoteEnabled&&this.settings.folderNoteHideInExplorer}folderClickEnabled(){return this.settings.folderNoteEnabled&&this.settings.folderNoteOpenOnClick}setupObserver(){let t=()=>{let e=document.querySelector(".nav-files-container");!e||this.observer||(this.observer=new MutationObserver(r=>{if(this.hideEnabled())for(let s of r)for(let i of Array.from(s.addedNodes))this.hideFolderNotesInNode(i);this.scheduleFolderRefresh()}),this.observer.observe(e,{childList:!0,subtree:!0}))};t(),this.plugin.registerEvent(this.app.workspace.on("layout-change",t))}hideFolderNotePath(t){!this.hideEnabled()||!L(t)||this.applyHideToPath(t)}applyHideToPath(t){document.querySelector(`.nav-files-container .nav-file-title[data-path="${CSS.escape(t)}"]`)?.closest(".nav-file")?.classList.add(At)}hideFolderNotesInNode(t){if(t.instanceOf(HTMLElement)){t.matches(".nav-file-title[data-path]")&&this.maybeHideTitle(t);for(let e of Array.from(t.querySelectorAll(".nav-file-title[data-path]")))this.maybeHideTitle(e)}}maybeHideTitle(t){let e=t.dataset.path;!e||!L(e)||t.closest(".nav-file")?.classList.add(At)}hideAllFolderNotes(){if(this.hideEnabled())for(let t of Array.from(document.querySelectorAll(".nav-files-container .nav-file-title[data-path]")))this.maybeHideTitle(t)}unhideAllFolderNotes(){document.querySelectorAll(`.nav-files-container .${At}`).forEach(t=>t.classList.remove(At))}clearFolderMarks(){document.querySelectorAll(`.${Lr}`).forEach(t=>t.classList.remove(Lr))}clearDevSealedMarks(){document.querySelectorAll(`.${Cr}`).forEach(t=>t.classList.remove(Cr))}clearAllMarks(){this.clearFolderMarks(),this.clearDevSealedMarks(),this.unhideAllFolderNotes(),Pt()}refreshExplorerUi(){this.fileExplorerPatch.tryInstallAndSort(),this.refreshFolderMarks(),this.refreshDevSealedMarks(),this.refreshFileTags(),this.hideAllFolderNotes()}refreshFileTags(){Pt();for(let t of Array.from(document.querySelectorAll(".nav-files-container .nav-file-title[data-path]"))){let e=t.dataset.path;if(!e||L(e)&&this.hideEnabled())continue;let r=this.app.vault.getAbstractFileByPath(e);r instanceof H.TFile&&Ct(t,Tr(this.app,r,this.settings.customGraphs))}for(let t of Array.from(document.querySelectorAll(".nav-files-container .nav-folder-title[data-path]"))){let e=t.dataset.path;if(!e)continue;let r=this.app.vault.getAbstractFileByPath(e);r instanceof H.TFolder&&Ct(t,Sr(this.app,r,this.settings.developmentFolders))}}refreshDevSealedMarks(){this.clearDevSealedMarks();for(let t of Array.from(document.querySelectorAll(".nav-files-container .nav-folder-title[data-path]"))){let e=t.dataset.path;if(!e||!oe(e,this.settings.developmentFolders))continue;let r=t.closest(".nav-folder");r?.classList.add(Cr),r?.classList.add("is-collapsed")}}refreshFolderMarks(){if(this.clearFolderMarks(),!!this.folderClickEnabled())for(let t of Array.from(document.querySelectorAll(".nav-files-container .nav-folder-title[data-path]"))){let e=t.dataset.path;if(!e)continue;let r=this.app.vault.getAbstractFileByPath(e);r instanceof H.TFolder&&T(this.app,r)&&t.closest(".nav-folder")?.classList.add(Lr)}}isFolderTitleClick(t){return Pr(t)?!!t.closest(".nav-folder-title-content"):!1}isCollapseClick(t){return Pr(t)?!!t.closest(".nav-folder-collapse-indicator"):!1}getFolderFromClick(t){if(!Pr(t)||!t.closest(".nav-files-container"))return null;let s=t.closest(".nav-folder")?.querySelector(":scope > .nav-folder-title")?.dataset.path;if(!s)return null;let i=this.app.vault.getAbstractFileByPath(s);return i instanceof H.TFolder?i:null}async openFolderNote(t,e){let r=T(this.app,t);r&&await this.app.workspace.openLinkText(r.path,"",e,{active:!0})}isSealedFolderClick(t){let e=this.getFolderFromClick(t);return e?oe(e.path,this.settings.developmentFolders):!1}};var Or=require("obsidian");var Ys=[".base",".canvas"];function et(o){return Ys.some(t=>o.endsWith(t))}function Mr(o,t,e){return e?.link?o.metadataCache.getFirstLinkpathDest(e.link,t)?.path??null:null}function Fr(o,t,e){if(!et(e))return!1;let r=o.metadataCache.getCache(t);if(!r)return!1;let s=!1;for(let i of r.embeds??[])if(Mr(o,t,i)===e){s=!0;break}if(!s)return!1;for(let i of r.links??[])if(Mr(o,t,i)===e)return!1;for(let i of r.frontmatterLinks??[])if(Mr(o,t,i)===e)return!1;return!0}function Ar(o,t,e){return Fr(o,t,e)||Fr(o,e,t)}var ce=require("obsidian");var Ci=/^\[\[[^\]]+\]\]$/;function Ks(o){if(typeof o!="string")return!1;let t=o.trim();return t.length>0&&Ci.test(t)}function Xs(o){return o==null||o===""?!0:typeof o=="string"?Ks(o):Array.isArray(o)?o.every(t=>Ks(t)):!1}var Dr="link",de="link";function Zs(o){let t=o.registeredTypeWidgets.links??o.registeredTypeWidgets.link??o.registeredTypeWidgets.multitext;t&&(o.registeredTypeWidgets[Dr]=Pi(t),o.setType(de,Dr))}function Pi(o){return{type:Dr,icon:"links-going-out",reservedKeys:[],default:()=>[],name:()=>d("properties.linkType"),validate:Xs,render:(t,e,r)=>o.render(t,e,r)}}var Js={sensitivity:"base",numeric:!0};function Dt(o){if(o==null||o==="")return[];if(typeof o=="string"){let t=o.trim();return t?[t]:[]}return Array.isArray(o)?o.filter(t=>typeof t=="string").map(t=>t.trim()).filter(Boolean):[]}function Qs(o){return`[[${o.basename}]]`}function Mi(o,t){let e=new Set;for(let r of t.children){if(r instanceof ce.TFile){r.extension==="md"&&!L(r.path)&&e.add(r.path);continue}if(r instanceof ce.TFolder){let s=T(o,r);s&&e.add(s.path)}}return e}function Ir(o,t){let e=[];for(let r of t.children){if(r instanceof ce.TFile){r.extension==="md"&&!L(r.path)&&e.push(Qs(r));continue}if(r instanceof ce.TFolder){let s=T(o,r);s&&e.push(Qs(s))}}return e}function we(o,t,e){let r=t.match(/^\[\[([^\]|#]+)(?:[|#][^\]]*)?\]\]$/);if(!r)return null;let s=r[1].trim();return o.metadataCache.getFirstLinkpathDest(s,e)?.path??null}function Fi(o,t,e,r){let s=we(o,t,e);return s!==null&&r.has(s)}function eo(o,t,e){let r=we(o,t,e);if(!r)return t;let s=o.vault.getAbstractFileByPath(r);if(!(s instanceof ce.TFile))return t;let i=o.metadataCache.getFileCache(s)?.frontmatter;return z(i,s.basename)}function Ai(o,t,e){return[...t].sort((r,s)=>{let i=eo(o,r,e).localeCompare(eo(o,s,e),void 0,Js);return i!==0?i:r.localeCompare(s,void 0,Js)})}function Br(o,t,e,r,s){let i=e.path,a=Mi(o,t),n=s.filter(c=>!Fi(o,c,i,a)),l=new Map;for(let c of r){let u=we(o,c,i);u&&l.set(u,c)}for(let c of n){let u=we(o,c,i);if(u){l.has(u)||l.set(u,c);continue}l.set(`manual:${c}`,c)}return Ai(o,[...l.values()],i)}function to(o,t){let e=o.metadataCache.getFileCache(t)?.frontmatter;return Dt(e?.[de])}function Nr(o,t){return o.length!==t.length?!1:o.every((e,r)=>e===t[r])}function Rr(o,t,e){let r=o.metadataCache.getCache(t),s=Dt(r?.frontmatter?.[de]);if(s.length===0)return!1;for(let i of s)if(we(o,i,t)===e)return!0;return!1}var tt=class{constructor(t,e){this.app=t;this.settings=e}updateSettings(t){this.settings=t}patchAllGraphs(t){for(let e of t){let s=e.view?.renderer;s?.nodes&&this.patchRenderer(s)}}collectLegendEntries(t){let e=[],r=new Set;for(let s of t){let a=s.view?.renderer?.nodes;if(a)for(let n of a){if(r.has(n.id))continue;r.add(n.id);let l=this.getLegendEntryForNode(n);l&&e.push(l)}}return e.sort((s,i)=>s.name.localeCompare(i.name))}patchRenderer(t){let e=!1;this.removeSealedDevelopmentNodes(t)&&(e=!0);for(let r of t.nodes)this.patchNode(r,!0)&&(e=!0);this.decoupleNonFrontmatterLinks(t)&&(e=!0),this.decoupleEmbedOnlyLinks(t)&&(e=!0),e&&typeof t.changed=="function"&&t.changed()}removeSealedDevelopmentNodes(t){let e=this.settings.developmentFolders;if(!e.length)return!1;let r=new Set;for(let s of t.nodes)A(s.id,e)&&r.add(s.id);return r.size===0?!1:this.removeNodeIds(t,r)}removeNodeIds(t,e){let r=t.links;if(r?.length){let s=r.filter(i=>e.has(i.source.id)||e.has(i.target.id));for(let i of s)this.removeGraphLink(t,i)}for(let s=t.nodes.length-1;s>=0;s--){let i=t.nodes[s];e.has(i.id)&&(this.clearNodeGraphics(i),t.nodes.splice(s,1),t.nodeLookup&&i.id in t.nodeLookup&&delete t.nodeLookup[i.id])}return this.resyncForceWorker(t),!0}clearNodeGraphics(t){typeof t.clearGraphics=="function"&&t.clearGraphics(),typeof t.destroy=="function"&&t.destroy()}decoupleNonFrontmatterLinks(t){if(!this.settings.graphOnlyFrontmatterLinks)return!1;let e=t.links;if(!e?.length)return!1;let r=[];for(let s of e){let i=s.source.id,a=s.target.id;Rr(this.app,i,a)||r.push(s)}if(r.length===0)return!1;for(let s of r)this.removeGraphLink(t,s);return this.resyncForceWorker(t),!0}decoupleEmbedOnlyLinks(t){if(!this.settings.graphHideBaseEmbedLinks)return!1;let e=t.links;if(!e?.length)return!1;let r=[];for(let s of e){let i=s.source.id,a=s.target.id;!et(i)&&!et(a)||Ar(this.app,i,a)&&r.push(s)}if(r.length===0)return!1;for(let s of r)this.removeGraphLink(t,s);return this.resyncForceWorker(t),!0}removeGraphLink(t,e){typeof e.clearGraphics=="function"&&e.clearGraphics();let r=t.links;if(r){let a=r.indexOf(e);a!==-1&&r.splice(a,1)}let s=e.source.id,i=e.target.id;e.source.forward&&i in e.source.forward&&delete e.source.forward[i],e.target.reverse&&s in e.target.reverse&&delete e.target.reverse[s]}resyncForceWorker(t){let e=t.worker;if(!e||typeof e.postMessage!="function")return;let r={};for(let i of t.nodes){let a=typeof i.x=="number"?i.x:0,n=typeof i.y=="number"?i.y:0;r[i.id]=[a,n]}let s=[];for(let i of t.links??[])s.push([i.source.id,i.target.id]);e.postMessage({nodes:r,links:s,alpha:.3,run:!0})}patchNode(t,e){if(e&&A(t.id,this.settings.developmentFolders))return!1;let r=this.app.vault.getAbstractFileByPath(t.id);if(!(r instanceof Or.TFile))return!1;let s=!1;r.extension!=="md"&&t.text&&t.text.text!==r.basename&&(t.text.text=r.basename,s=!0);let i=this.app.metadataCache.getFileCache(r)?.frontmatter;if(!i)return s;let a=Jr(i[this.settings.sizeProperty],this.settings.minSize,this.settings.maxSize);a!==null&&t.weight!==a&&(t.weight=a,s=!0);let n=Pe(i[this.settings.colorProperty]);if(n){let l=Zr(n);if(l!==null){let c=t.color;(!c||c.rgb!==l||c.a!==1)&&(t.color={a:1,rgb:l},s=!0)}}return s}getLegendEntryForNode(t){if(A(t.id,this.settings.developmentFolders))return null;let e=this.app.vault.getAbstractFileByPath(t.id);if(!(e instanceof Or.TFile))return null;let r=this.app.metadataCache.getFileCache(e)?.frontmatter,s=this.getExplicitColor(r),i=Pe(this.settings.defaultColor);if(!this.settings.legendShowDefaultAndUncolored)return!s||i&&s===i?null:{name:e.basename,path:e.path,color:s};let a=s??i??this.settings.defaultColor;return{name:e.basename,path:e.path,color:a}}getExplicitColor(t){if(!t)return null;let e=t[this.settings.colorProperty];return e==null||e===""?null:Pe(e)}};var so=require("obsidian");var rt="corvidae-legend";function ro(o){if(!S(o))return null;let t=o.containerEl;return!t||typeof t!="object"||!t.instanceOf?.(HTMLElement)?null:{containerEl:t}}function Y(o){return o.replace(/^#/,"").toLowerCase()}function Di(o){return Y(o).toUpperCase()}var st=class{constructor(t,e){this.app=t;this.settings=e;this.selectedColorByLeaf=new WeakMap}updateSettings(t){this.settings=t}syncLegends(t,e){for(let r of t){let s=ro(r.view);if(!s)continue;if(ls(r)){s.containerEl.querySelector(`.${rt}`)?.remove();continue}if(!this.settings.showLegend||e.length===0){s.containerEl.querySelector(`.${rt}`)?.remove();continue}let i=s.containerEl;i.addClass("corvidae-legend-host");let a=e.map(b=>`${b.path}\0${b.color}\0${b.name}`).sort().join(`
`),n=i.querySelector(`.${rt}`);if(n?.instanceOf(HTMLElement)&&n.dataset.corvidaeFingerprint===a)continue;n?.remove();let l=i.createDiv({cls:rt});l.dataset.corvidaeFingerprint=a,l.createDiv({cls:"corvidae-legend-title",text:d("legend.title")});let c=[...new Set(e.map(b=>b.color))].sort((b,y)=>Y(b).localeCompare(Y(y))),u=this.selectedColorByLeaf.get(r),f=u&&c.some(b=>Y(b)===Y(u))?u:c[0];this.selectedColorByLeaf.set(r,f);let h=l.createDiv({cls:"corvidae-legend-filter"}).createEl("select",{cls:"corvidae-legend-color-select",attr:{"aria-label":d("legend.filterColor")}});for(let b of c){let y=h.createEl("option",{text:Di(b),value:b});Y(b)===Y(f)&&(y.selected=!0)}let p=l.createDiv({cls:"corvidae-legend-list"}),v=b=>{p.empty();let y=e.filter(x=>Y(x.color)===Y(b)).sort((x,P)=>x.name.localeCompare(P.name));if(y.length===0){p.createDiv({cls:"corvidae-legend-empty",text:d("legend.empty")});return}for(let x of y){let P=p.createDiv({cls:"corvidae-legend-item"});P.setAttr("role","button"),P.setAttr("tabindex","0");let Z=P.createDiv({cls:"corvidae-legend-dot"});Z.style.background=x.color,Z.style.boxShadow=`0 0 4px ${x.color}`,P.createSpan({cls:"corvidae-legend-label",text:x.name});let Le=()=>void this.openEntryInNewTab(x.path);P.addEventListener("click",_=>{_.preventDefault(),_.stopPropagation(),Le()}),P.addEventListener("keydown",_=>{_.key!=="Enter"&&_.key!==" "||(_.preventDefault(),Le())})}};v(f),h.addEventListener("change",()=>{let b=h.value;this.selectedColorByLeaf.set(r,b),v(b)})}}removeAll(t){for(let e of t)ro(e.view)?.containerEl?.querySelector(`.${rt}`)?.remove()}async openEntryInNewTab(t){let e=this.app.vault.getAbstractFileByPath(t);if(!(e instanceof so.TFile))return;await this.app.workspace.getLeaf("tab").openFile(e,{active:!0})}};var It=require("obsidian");var Ii=200,ot=class{constructor(t,e){this.app=t;this.settings=e;this.processing=new Set;this.syncWritePaths=new Set;this.queue=Promise.resolve()}updateSettings(t){this.settings=t}scheduleSyncForFolder(t){this.shouldSync(t.path)&&this.schedule(`folder:${t.path}`,()=>this.syncFolder(t))}scheduleSyncForParentOf(t){if(!this.settings.folderNoteEnabled)return;let e=t.parent;!(e instanceof It.TFolder)||e.path===""||this.scheduleSyncForFolder(e)}scheduleSyncForRename(t,e){if(!this.settings.folderNoteEnabled)return;this.scheduleSyncForParentOf(t);let r=e.lastIndexOf("/"),s=r===-1?"":e.slice(0,r),i=this.app.vault.getAbstractFileByPath(s);i instanceof It.TFolder&&this.scheduleSyncForFolder(i)}scheduleSyncForMetadataChange(t){if(!this.settings.folderNoteEnabled||this.syncWritePaths.has(t.path))return;let e=t.parent;if(!(e instanceof It.TFolder)||e.path==="")return;let r=T(this.app,e);!r||t.path===r.path||this.scheduleSyncForFolder(e)}async syncFolder(t){let e=T(this.app,t);if(!e)return;let r=Ir(this.app,t),s=to(this.app,e),i=Br(this.app,t,e,r,s);Nr(s,i)||await this.withProcessing([t.path,e.path],async()=>{this.syncWritePaths.add(e.path);try{await this.app.fileManager.processFrontMatter(e,a=>{let n=(S(a),a);n[de]=i})}finally{window.setTimeout(()=>{this.syncWritePaths.delete(e.path)},300)}})}shouldSync(t){if(!this.settings.folderNoteEnabled)return!1;for(let e of this.settings.folderNoteExcludePrefixes){let r=e.replace(/\/$/,"");if(t===r||t.startsWith(`${r}/`))return!1}return!A(t,this.settings.developmentFolders)}schedule(t,e){return this.enqueue(async()=>{if(await this.defer(Ii),!this.processing.has(t))try{return await e()}catch{return}})}defer(t){return new Promise(e=>window.setTimeout(e,t))}enqueue(t){let e=this.queue.then(t,t);return this.queue=e.then(()=>{},()=>{}),e}async withProcessing(t,e){for(let r of t)this.processing.add(r);try{return await e()}finally{for(let r of t)this.processing.delete(r)}}};var oo=require("obsidian");var it=class{constructor(t,e){this.app=t;this.settings=e}updateSettings(t){this.settings=t}async onFileCreated(t){if(!this.settings.autoFrontmatter||t.extension!=="md"||t.basename.toLowerCase()==="readme"||Lt(this.app,t)||le(t.path,this.settings.customGraphs)||A(t.path,this.settings.developmentFolders))return t;let e=this.app.vault.getAbstractFileByPath(t.path)??t;return e instanceof oo.TFile?(await this.app.fileManager.processFrontMatter(e,r=>{let s=(S(r),r),i=s.aliases;i==null?s.aliases=[e.basename]:Array.isArray(i)&&i.length===0&&(s.aliases=[e.basename]);let a=s.tags;a==null&&(s.tags=[...this.settings.defaultTags]);let n=this.settings.sizeProperty,l=s[n];(l==null||l==="")&&(s[n]=this.settings.defaultSize);let c=this.settings.colorProperty,u=s[c];(u==null||u==="")&&(s[c]=this.settings.defaultColor)}),await this.ensureDefaultBodySeparator(e),this.app.vault.getFileByPath(e.path)??e):t}async ensureDefaultBodySeparator(t){let e=await this.app.vault.read(t),r=e.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?([\s\S]*)$/);if((r?r[1].trim():e.trim())!=="")return;let i=e.endsWith(`
`)?`---
`:`
---
`;await this.app.vault.modify(t,e+i)}};var Bt="graph";function io(o,t){try{let e=o.metadataTypeManager;if(!e?.registeredTypeWidgets||!e.setType)return;let r=e.registeredTypeWidgets.number,s=e.registeredTypeWidgets.text;if(!r||!s)return;e.registeredTypeWidgets[Bt]={type:Bt,icon:"graph-glyph",reservedKeys:[],default:()=>"",name:()=>d("properties.graphType"),validate:i=>i==null||i===""?!0:typeof i=="number"?!isNaN(i):typeof i=="string",render:(i,a,n)=>n.key===t.sizeProperty?r.render(i,a,n):(n.key===t.colorProperty,s.render(i,a,n))},Zs(e),e.setType(t.sizeProperty,Bt),e.setType(t.colorProperty,Bt),e.setType("tags","tags"),e.setType("aliases","aliases"),e.save?.()}catch(e){console.warn(d("console.propertyTypesFailed"),e)}}var K={language:"auto",showLegend:!0,legendShowDefaultAndUncolored:!1,graphHideBaseEmbedLinks:!0,graphOnlyFrontmatterLinks:!0,sizeProperty:"size",minSize:1,maxSize:100,colorProperty:"color",patchIntervalMs:500,autoFrontmatter:!0,defaultTags:[],defaultSize:50,defaultColor:"#888888",folderNoteEnabled:!0,folderNoteSyncRename:!0,folderNoteExcludePrefixes:[".trash"],folderNoteOpenOnClick:!0,folderNoteHideInExplorer:!0,developmentFolders:[],customGraphs:[],dashboardAutoOpen:!0,showNoteFileTitle:!1,filePropertiesSidebarInitialized:!1,ticketProjects:[],ticketsSidebarAutoOpen:!0};var I=require("obsidian");var Ee=require("obsidian");function Bi(o){let t=[],e=o.vault.getRoot(),r=s=>{t.push(s);for(let i of s.children)i instanceof Ee.TFolder&&r(i)};return r(e),t}var V=class extends Ee.AbstractInputSuggest{constructor(e,r,s){super(e,r);this.onPick=s;this.limit=20}getSuggestions(e){let r=Bi(this.app),s=e.trim();if(!s)return r.filter(n=>n.path!=="").sort((n,l)=>n.path.localeCompare(l.path)).slice(0,this.limit);let i=(0,Ee.prepareFuzzySearch)(s),a=[];for(let n of r){if(n.path==="")continue;let l=`${n.name} ${n.path}`,c=i(l);c&&a.push({folder:n,score:c.score})}return a.sort((n,l)=>l.score-n.score).slice(0,this.limit).map(n=>n.folder)}renderSuggestion(e,r){r.empty(),r.createDiv({cls:"corvidae-folder-suggest-title",text:e.name}),r.createDiv({cls:"corvidae-folder-suggest-path",text:e.path})}selectSuggestion(e,r){this.setValue(e.path),this.onPick(e),this.close()}};var co=require("obsidian");var ao=require("obsidian");var M="corvidae-tickets",Te=class extends ao.ItemView{constructor(t,e){super(t),this.plugin=e}getViewType(){return M}getDisplayText(){return d("tickets.viewTitle")}getIcon(){return"list-checks"}async onOpen(){let{contentEl:t}=this;t.empty(),t.addClass("corvidae-tickets-view"),this.ticketsContentEl=t.createDiv({cls:"corvidae-tickets-content"}),this.render(),window.requestAnimationFrame(()=>{this.containerEl.closest(".workspace-tabs")?.addClass("corvidae-tickets-sidebar-bottom")})}async onClose(){this.contentEl.empty()}refresh(){this.render()}render(){if(!this.ticketsContentEl)return;this.ticketsContentEl.empty();let t=this.plugin.settings.ticketProjects;if(t.length===0){this.ticketsContentEl.createEl("p",{cls:"corvidae-tickets-empty",text:d("tickets.empty")});return}for(let e of t)this.renderProject(e)}renderProject(t){let e=this.ticketsContentEl.createDiv({cls:"corvidae-tickets-project"});e.createEl("h4",{cls:"corvidae-tickets-project-title",text:t.name||d("tickets.unnamedProject")});let r=this.plugin.ticketManager.validateProject(t);if(r){e.createEl("p",{cls:"corvidae-tickets-project-error",text:r});return}let s=e.createEl("textarea",{cls:"corvidae-tickets-input",attr:{placeholder:d("tickets.inputPlaceholder"),rows:"3"}}),a=e.createDiv({cls:"corvidae-tickets-actions"}).createEl("button",{cls:"mod-cta",text:d("tickets.create")}),n=()=>{this.plugin.ticketManager.createTicket(t,s.value).then(l=>{l&&(s.value="")})};this.registerDomEvent(a,"click",n),this.registerDomEvent(s,"keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&(l.preventDefault(),n())})}};var no=220,po="file-properties";async function Nt(o){let{workspace:t}=o,e=t.rightSplit;e instanceof co.WorkspaceSidedock&&e.collapsed&&e.expand(),Gi(t);let r=Oi(t,e);if(r)r.view.getViewType()!==M&&await r.setViewState({type:M,active:!0});else{for(let i of t.getLeavesOfType(M))at(i,e)&&i.detach();let s=await Ni(t);if(!s)return;r=t.createLeafBySplit(s,"horizontal",!1),await r.setViewState({type:M,active:!0})}Hi(t,e,r),lo(r),window.requestAnimationFrame(()=>{lo(r)}),await t.revealLeaf(r)}async function Ni(o){let t=Ri(o);if(t)return t;if(typeof o.ensureSideLeaf=="function")return o.ensureSideLeaf(po,"right",{active:!1,reveal:!1,split:!1});let e=o.getRightLeaf(!1);return e?(await e.setViewState({type:"empty",active:!1}),e):null}function Ri(o){let t=o.rightSplit,e=o.getLeavesOfType(po).find(s=>at(s,t));if(e)return e;let r=null;return o.iterateAllLeaves(s=>{r||at(s,t)&&(Vi(s)||(r=s))}),r}function Oi(o,t){return o.getLeavesOfType(M).find(e=>at(e,t))??null}function Gi(o){for(let t of o.getLeavesOfType(M))_i(t,o)&&t.detach()}function Hi(o,t,e){for(let r of o.getLeavesOfType(M))r!==e&&at(r,t)&&r.detach()}function Vi(o){return o.view.getViewType()===M}function at(o,t){let e=o.parent;for(;e;){if(e===t)return!0;e=e.parent??null}return!1}function _i(o,t){let{leftSplit:e,rightSplit:r,rootSplit:s}=t,i=o.parent;for(;i&&i!==s;){if(i===e||i===r)return!1;i=i.parent}return i===s}function zi(o){let t=o.parent;for(;t;){if("direction"in t&&t.direction==="horizontal")return t;t=t.parent}return null}function lo(o){let t=zi(o);if(!t)return;let e=t.children;if(!e||e.length!==2)return;let s=o.view.containerEl.closest(".workspace-split.mod-horizontal, .workspace-split.mod-horizontal-split")?.clientHeight??0;if(s<=no)return;let i=no/s*100,a=100-i;e[0].dimension=a,e[1].dimension=i}var D=require("obsidian");var Wi=/^TICKET (\d+)$/i,Se=class{constructor(t,e){this.app=t;this.noteBootstrap=e}getNextTicketNumber(t){let e=0;for(let r of[t.undoneFolder,t.doneFolder]){let s=this.app.vault.getAbstractFileByPath(r);if(s instanceof D.TFolder)for(let i of s.children){if(!(i instanceof D.TFile)||i.extension!=="md")continue;let a=i.basename.match(Wi);a&&(e=Math.max(e,parseInt(a[1],10)))}}return e+1}formatTicketName(t){let e=Math.max(2,String(t).length);return`TICKET ${String(t).padStart(e,"0")}`}validateProject(t){return t.name.trim()?t.undoneFolder.trim()?t.doneFolder.trim()?this.app.vault.getAbstractFileByPath(t.undoneFolder)instanceof D.TFolder?this.app.vault.getAbstractFileByPath(t.doneFolder)instanceof D.TFolder?null:d("tickets.error.doneMissing"):d("tickets.error.undoneMissing"):d("tickets.error.doneRequired"):d("tickets.error.undoneRequired"):d("tickets.error.nameRequired")}async createTicket(t,e){let r=e.trim();if(!r)return new D.Notice(d("tickets.error.bodyRequired")),null;let s=this.validateProject(t);if(s)return new D.Notice(s),null;let i=this.getNextTicketNumber(t),a=this.formatTicketName(i),n=`${t.undoneFolder}/${a}.md`;if(this.app.vault.getAbstractFileByPath(n))return new D.Notice(d("tickets.error.alreadyExists").replace("{name}",a)),null;try{let l=await this.app.vault.create(n,r);return await this.noteBootstrap.onFileCreated(l),new D.Notice(d("tickets.notice.created").replace("{name}",a)),l}catch{return new D.Notice(d("tickets.error.createFailed")),null}}};var pe=require("obsidian");function ji(){return typeof crypto<"u"&&crypto.randomUUID?crypto.randomUUID():`ticket-${Date.now()}-${Math.random().toString(36).slice(2,9)}`}function Gr(o,t,e){let r=o.createDiv({cls:"corvidae-tickets-settings-list"}),s=()=>{r.empty();for(let i of t.settings.ticketProjects)Ui(r,t,i,()=>{s(),e?.()})};new pe.Setting(o).addButton(i=>i.setButtonText(d("settings.tickets.addProject")).setCta().onClick(async()=>{t.settings.ticketProjects.push({id:ji(),name:d("settings.tickets.defaultProjectName"),undoneFolder:"",doneFolder:"",developmentLogPath:""}),await t.saveSettings(),t.refreshTicketsViews(),s(),e?.()})),s()}function Ui(o,t,e,r){let s=o.createDiv({cls:"corvidae-tickets-settings-card"});new pe.Setting(s).setName(d("settings.tickets.projectName")).addText(i=>i.setPlaceholder(d("settings.tickets.projectNamePlaceholder")).setValue(e.name).onChange(async a=>{e.name=a,await t.saveSettings(),t.refreshTicketsViews()})),new pe.Setting(s).setName(d("settings.tickets.undoneFolder")).setDesc(d("settings.tickets.undoneFolderDesc")).addText(i=>{i.setPlaceholder("ORGANISATION/Project/Tickets/Open").setValue(e.undoneFolder).onChange(async a=>{e.undoneFolder=a.trim(),await t.saveSettings(),t.refreshTicketsViews()}),new V(t.app,i.inputEl,a=>{e.undoneFolder=a.path,i.setValue(a.path),t.saveSettings(),t.refreshTicketsViews()})}),new pe.Setting(s).setName(d("settings.tickets.doneFolder")).setDesc(d("settings.tickets.doneFolderDesc")).addText(i=>{i.setPlaceholder("ORGANISATION/Project/Tickets/Done").setValue(e.doneFolder).onChange(async a=>{e.doneFolder=a.trim(),await t.saveSettings(),t.refreshTicketsViews()}),new V(t.app,i.inputEl,a=>{e.doneFolder=a.path,i.setValue(a.path),t.saveSettings(),t.refreshTicketsViews()})}),new pe.Setting(s).setName(d("settings.tickets.developmentLogPath")).setDesc(d("settings.tickets.developmentLogPathDesc")).addText(i=>{if(i.setPlaceholder("ORGANISATION/Project/ENTWICKLUNG/ENTWICKLUNG.md").setValue(e.developmentLogPath??""),e.developmentLogPath){let a=t.app.vault.getFileByPath(e.developmentLogPath);a&&i.setValue(re(t.app,a))}i.onChange(async a=>{if(!a.trim()){e.developmentLogPath="",await t.saveSettings(),t.refreshTicketsViews(),t.resyncDashboardTicketEmbeds();return}let n=t.app.vault.getFileByPath(a.trim());n?e.developmentLogPath=n.path:e.developmentLogPath=a.trim(),await t.saveSettings(),t.refreshTicketsViews(),t.resyncDashboardTicketEmbeds()}),new fe(t.app,i.inputEl,a=>{e.developmentLogPath=a.path,i.setValue(re(t.app,a)),t.saveSettings(),t.refreshTicketsViews(),t.resyncDashboardTicketEmbeds()})}),new pe.Setting(s).addButton(i=>i.setButtonText(d("settings.tickets.removeProject")).setDestructive().onClick(async()=>{t.settings.ticketProjects=t.settings.ticketProjects.filter(a=>a.id!==e.id),await t.saveSettings(),t.refreshTicketsViews(),r()}))}var nt=class extends I.PluginSettingTab{constructor(t,e){super(t,e),this.plugin=e}getControlValue(t){let e=this.plugin.settings;return t==="folderNoteExcludePrefixes"?e.folderNoteExcludePrefixes.join(", "):t==="defaultTags"?e.defaultTags.join(", "):t==="minSize"||t==="maxSize"||t==="defaultSize"||t==="patchIntervalMs"?String(e[t]):e[t]}async setControlValue(t,e){let r=this.plugin.settings;if(t==="language"&&typeof e=="string"){r.language=e,await this.plugin.saveSettings(),this.plugin.onLanguageChanged(),this.update();return}if(t==="folderNoteExcludePrefixes"&&typeof e=="string"){r.folderNoteExcludePrefixes=e.split(",").map(s=>s.trim()).filter(Boolean),await this.plugin.saveSettings();return}if(t==="defaultTags"&&typeof e=="string"){r.defaultTags=e.split(",").map(s=>s.trim()).filter(Boolean),await this.plugin.saveSettings();return}if((t==="minSize"||t==="maxSize"||t==="defaultSize"||t==="patchIntervalMs")&&typeof e=="string"){let s=parseInt(e,10);if(isNaN(s)||t==="patchIntervalMs"&&s<100)return;r[t]=s,await this.plugin.saveSettings(),(t==="minSize"||t==="maxSize")&&this.plugin.refreshGraphFeatures(),t==="patchIntervalMs"&&this.plugin.restartPatchInterval();return}if(t==="sizeProperty"&&typeof e=="string"){r.sizeProperty=e.trim()||"size",await this.plugin.saveSettings(),this.plugin.registerCorvidaePropertyTypes();return}if(t==="colorProperty"&&typeof e=="string"){r.colorProperty=e.trim()||"color",await this.plugin.saveSettings(),this.plugin.registerCorvidaePropertyTypes();return}if(t==="defaultColor"&&typeof e=="string"){r.defaultColor=e.trim()||K.defaultColor,await this.plugin.saveSettings();return}if(typeof e=="boolean"){r[t]=e,await this.plugin.saveSettings(),(t==="showLegend"||t==="legendShowDefaultAndUncolored"||t==="graphHideBaseEmbedLinks"||t==="graphOnlyFrontmatterLinks")&&this.plugin.refreshGraphFeatures(),t==="showNoteFileTitle"&&this.plugin.applyNoteFileTitleVisibility(),t==="dashboardAutoOpen"&&e&&this.plugin.dashboardLayoutManager.scheduleSync();return}typeof e=="string"&&(r[t]=e,await this.plugin.saveSettings())}getSettingDefinitions(){return[{name:d("settings.tips.name"),desc:d("settings.tips.desc"),render:t=>{t.addButton(e=>e.setButtonText(d("settings.tips.button")).setCta().onClick(async()=>{await Ce(this.app,this.plugin)}))}},{name:d("settings.language.name"),desc:d("settings.language.desc"),control:{type:"dropdown",key:"language",options:{auto:d("settings.language.auto"),en:d("settings.language.en"),de:d("settings.language.de")}}},{name:d("settings.showLegend.name"),desc:d("settings.showLegend.desc"),control:{type:"toggle",key:"showLegend"}},{name:d("settings.legendShowAll.name"),desc:d("settings.legendShowAll.desc"),control:{type:"toggle",key:"legendShowDefaultAndUncolored"}},{name:d("settings.graphHideBaseEmbedLinks.name"),desc:d("settings.graphHideBaseEmbedLinks.desc"),control:{type:"toggle",key:"graphHideBaseEmbedLinks"}},{name:d("settings.graphOnlyFrontmatterLinks.name"),desc:d("settings.graphOnlyFrontmatterLinks.desc"),control:{type:"toggle",key:"graphOnlyFrontmatterLinks"}},{name:d("settings.showNoteFileTitle.name"),desc:d("settings.showNoteFileTitle.desc"),control:{type:"toggle",key:"showNoteFileTitle"}},{type:"group",heading:d("settings.dashboard.heading"),items:[{name:d("settings.dashboard.autoOpen.name"),desc:d("settings.dashboard.autoOpen.desc"),control:{type:"toggle",key:"dashboardAutoOpen"}}]},{type:"group",heading:d("settings.tickets.heading"),items:[{name:d("settings.tickets.autoOpen.name"),desc:d("settings.tickets.autoOpen.desc"),control:{type:"toggle",key:"ticketsSidebarAutoOpen"}},{name:d("settings.tickets.heading"),desc:d("settings.tickets.desc"),searchable:!1,render:t=>{t.settingEl.empty(),Gr(t.settingEl,this.plugin,()=>this.update())}}]},{name:d("settings.sizeProperty.name"),desc:d("settings.sizeProperty.desc"),control:{type:"text",key:"sizeProperty",placeholder:"size"}},{name:d("settings.minSize.name"),control:{type:"text",key:"minSize",placeholder:"1"}},{name:d("settings.maxSize.name"),control:{type:"text",key:"maxSize",placeholder:"100"}},{name:d("settings.colorProperty.name"),desc:d("settings.colorProperty.desc"),control:{type:"text",key:"colorProperty",placeholder:"color"}},{type:"group",heading:d("settings.folderNotes.heading"),items:[{name:d("settings.folderNotes.enabled.name"),desc:d("settings.folderNotes.enabled.desc"),control:{type:"toggle",key:"folderNoteEnabled"}},{name:d("settings.folderNotes.syncRename.name"),control:{type:"toggle",key:"folderNoteSyncRename"}},{name:d("settings.folderNotes.excludedPaths.name"),desc:d("settings.folderNotes.excludedPaths.desc"),control:{type:"text",key:"folderNoteExcludePrefixes",placeholder:`${this.app.vault.configDir}, .trash`}},{name:d("settings.folderNotes.openOnClick.name"),control:{type:"toggle",key:"folderNoteOpenOnClick"}},{name:d("settings.folderNotes.hideInExplorer.name"),control:{type:"toggle",key:"folderNoteHideInExplorer"}}]},{name:d("settings.developmentFolders.heading"),desc:d("settings.developmentFolders.desc"),render:t=>{t.settingEl.empty(),this.renderDevelopmentFoldersSection(t.settingEl)}},{name:d("settings.customGraph.heading"),desc:d("settings.customGraph.desc"),render:t=>{t.settingEl.empty(),this.renderCustomGraphSection(t.settingEl)}},{type:"group",heading:d("settings.newNotes.heading"),items:[{name:d("settings.newNotes.autoFrontmatter.name"),desc:d("settings.newNotes.autoFrontmatter.desc"),control:{type:"toggle",key:"autoFrontmatter"}},{name:d("settings.newNotes.defaultTags.name"),desc:d("settings.newNotes.defaultTags.desc"),control:{type:"text",key:"defaultTags",placeholder:""}},{name:d("settings.newNotes.defaultSize.name"),control:{type:"text",key:"defaultSize",placeholder:String(K.defaultSize)}},{name:d("settings.newNotes.defaultColor.name"),desc:d("settings.newNotes.defaultColor.desc"),control:{type:"text",key:"defaultColor",placeholder:K.defaultColor}}]},{type:"group",heading:d("settings.advanced.heading"),items:[{name:d("settings.advanced.patchInterval.name"),desc:d("settings.advanced.patchInterval.desc"),control:{type:"text",key:"patchIntervalMs",placeholder:String(K.patchIntervalMs)}}]}]}renderDevelopmentFoldersSection(t){new I.Setting(t).setHeading().setName(d("settings.developmentFolders.heading")).setDesc(d("settings.developmentFolders.desc"));let e=t.createDiv({cls:"corvidae-development-folders-list"}),r=()=>{e.empty(),this.plugin.settings.developmentFolders.forEach((s,i)=>{new I.Setting(e).addText(a=>{a.setPlaceholder(d("settings.developmentFolders.pathPlaceholder")).setValue(s).onChange(async n=>{this.plugin.settings.developmentFolders[i]=m(n.trim()),await this.plugin.saveSettings()}),new V(this.app,a.inputEl,n=>{this.plugin.settings.developmentFolders[i]=m(n.path),a.setValue(n.path),this.plugin.saveSettings()})}).addButton(a=>a.setButtonText(d("settings.developmentFolders.remove")).setDestructive().onClick(async()=>{this.plugin.settings.developmentFolders.splice(i,1),await this.plugin.saveSettings(),r()}))})};new I.Setting(t).addButton(s=>s.setButtonText(d("settings.developmentFolders.add")).setCta().onClick(async()=>{this.plugin.settings.developmentFolders.push(""),await this.plugin.saveSettings(),r()})),r()}renderCustomGraphSection(t){new I.Setting(t).setHeading().setName(d("settings.customGraph.heading")).setDesc(d("settings.customGraph.desc"));let e=t.createDiv({cls:"corvidae-custom-graph-settings-list"}),r=()=>{e.empty(),this.plugin.settings.customGraphs.forEach((s,i)=>{this.renderCustomGraphCard(e,s,i,r)})};new I.Setting(t).addButton(s=>s.setButtonText(d("settings.customGraph.add")).setCta().onClick(async()=>{this.plugin.settings.customGraphs.push({id:$e(),name:d("settings.customGraph.defaultName"),folder:"",codeFolder:""}),await this.plugin.saveSettings(),this.plugin.customGraphManager.onSettingsChanged(),r()})),r()}renderCustomGraphCard(t,e,r,s){let i=t.createDiv({cls:"corvidae-custom-graph-settings-card"});new I.Setting(i).setName(d("settings.customGraph.name")).addText(a=>a.setPlaceholder(d("settings.customGraph.namePlaceholder")).setValue(e.name).onChange(async n=>{e.name=n,await this.plugin.saveSettings(),this.plugin.customGraphManager.onSettingsChanged()})),new I.Setting(i).setName(d("settings.customGraph.folder.name")).setDesc(d("settings.customGraph.folder.desc")).addText(a=>{a.setPlaceholder(d("settings.customGraph.folder.placeholder")).setValue(e.folder).onChange(async n=>{e.folder=m(n.trim()),await this.plugin.saveSettings(),this.plugin.customGraphManager.onSettingsChanged()}),new V(this.app,a.inputEl,n=>{e.folder=m(n.path),a.setValue(n.path),this.plugin.saveSettings().then(()=>{this.plugin.customGraphManager.onSettingsChanged()})})}),new I.Setting(i).setName(d("settings.customGraph.codeFolder.name")).setDesc(d("settings.customGraph.codeFolder.desc")).addText(a=>{a.setPlaceholder(d("settings.customGraph.codeFolder.placeholder")).setValue(e.codeFolder??"").onChange(async n=>{e.codeFolder=m(n.trim()),await this.plugin.saveSettings(),this.plugin.customGraphManager.onSettingsChanged()}),new V(this.app,a.inputEl,n=>{e.codeFolder=m(n.path),a.setValue(n.path),this.plugin.saveSettings().then(()=>{this.plugin.customGraphManager.onSettingsChanged()})})}),new I.Setting(i).addButton(a=>a.setButtonText(d("settings.customGraph.remove")).setDestructive().onClick(async()=>{this.plugin.settings.customGraphs.splice(r,1),await this.plugin.saveSettings(),this.plugin.customGraphManager.onSettingsChanged(),s()}))}};var Ot=require("obsidian");var Rt="file-properties";async function Hr(o,t,e){if(t())return;let r=async()=>{if(!t())try{let{workspace:s}=o,i=s.rightSplit;i instanceof Ot.WorkspaceSidedock&&i.collapsed&&i.expand();let a=null;if(typeof s.ensureSideLeaf=="function")a=await s.ensureSideLeaf(Rt,"right",{active:!0,reveal:!0,split:!1});else if(a=s.getLeavesOfType(Rt).find(n=>qi(n,s.rightSplit))??null,!a){let n=s.getRightLeaf(!1);n&&(await n.setViewState({type:Rt,active:!0}),a=n)}a&&($i(s,a),await s.revealLeaf(a)),await e()}catch(s){console.warn("CORVIDAE: File-Properties-Sidebar konnte nicht ge\xF6ffnet werden",s)}};o.workspace.onLayoutReady(()=>{r()})}function $i(o,t){let e=t.parent;if(!(e instanceof Ot.WorkspaceTabs))return;let r=e.children;if(Array.isArray(r)){let a=r.indexOf(t);a>0&&(r.splice(a,1),r.unshift(t))}let i=Be(t).closest(".workspace-tabs")?.querySelector(".workspace-tab-header-container");if(i){let a=t.id,n=(a?i.querySelector(`.workspace-tab-header[data-tab-id="${a}"]`):null)??i.querySelector(`.workspace-tab-header[data-type="${Rt}"]`)??i.querySelector('.workspace-tab-header[aria-label*="File properties"]')??i.querySelector('.workspace-tab-header[aria-label*="Dateieigenschaften"]');n&&i.insertBefore(n,i.firstChild)}o.requestUpdateLayout?.()}function qi(o,t){let e=o.parent;for(;e;){if(e===t)return!0;e=e.parent??null}return!1}var Gt=class extends X.Plugin{constructor(){super(...arguments);this.settings={...K};this.patchIntervalId=null}async onload(){this.dashboardBoxStore=new Ie(this),this.dashboardGraphBoxEmbed=new Ne(this),this.dashboardNoteBoxEmbed=new Re(this),this.dashboardBrowserBoxEmbed=new Oe(this),this.dashboardTerminalBoxEmbed=new Ge(this),this.dashboardTicketBoxEmbed=new He(this),this.dashboardGraphBoxEmbed.onload(),this.dashboardTicketBoxEmbed.onload(),await this.loadSettings(),jr(()=>this.settings.language),this.applyNoteFileTitleVisibility(),this.graphPatcher=new tt(this.app,this.settings),this.legendManager=new st(this.app,this.settings),this.noteBootstrap=new it(this.app,this.settings),rr(this),cr(this),wr(this),this.ticketManager=new Se(this.app,this.noteBootstrap),this.folderNoteManager=new Ve(this.app,this.settings),this.hybridLinkManager=new ot(this.app,this.settings),this.folderNoteCreateUI=new ze(this),this.folderNoteCreateUI.onload(),this.explorerManager=new Qe(this.app,this,this.settings),this.explorerManager.onload(),this.customGraphManager=new Ye(this),this.customGraphManager.onload(),this.registerView(w,e=>new j(e,this,()=>this.settings)),this.registerView(M,e=>new Te(e,this)),this.registerView($,e=>new N(e,this)),this.dashboardLayoutManager=new Ae(this.app,this),this.dashboardCrowControl=new De(this),this.dashboardCrowControl.onload(),this.addCommand({id:"open-dashboard",name:d("dashboard.viewTitle"),callback:()=>{this.activateDashboard()}}),this.addCommand({id:"open-tickets-sidebar",name:d("tickets.command"),callback:()=>{Nt(this.app)}}),this.addCommand({id:"open-custom-graph",name:d("customGraph.command"),callback:()=>{this.customGraphManager.activate()}}),this.registerCorvidaePropertyTypes(),this.addSettingTab(new nt(this.app,this)),Hr(this.app,()=>this.settings.filePropertiesSidebarInitialized,async()=>{this.settings.filePropertiesSidebarInitialized=!0,await this.saveSettings()}),this.app.workspace.onLayoutReady(()=>{this.settings.ticketsSidebarAutoOpen&&Nt(this.app)}),this.setupGraphHooks(),this.registerEvent(this.app.metadataCache.on("changed",e=>{this.refreshGraphFeatures(),this.refreshDashboardBarViews(),e instanceof X.TFile&&this.hybridLinkManager.scheduleSyncForMetadataChange(e)})),this.registerEvent(this.app.vault.on("create",e=>{e instanceof X.TFile?this.handleFileCreated(e):e instanceof X.TFolder&&this.hybridLinkManager.scheduleSyncForParentOf(e),this.refreshDashboardBarViews(),this.dashboardLayoutManager.scheduleSync()})),this.registerEvent(this.app.vault.on("delete",e=>{this.hybridLinkManager.scheduleSyncForParentOf(e),this.refreshDashboardBarViews(),this.dashboardLayoutManager.scheduleSync()})),this.registerEvent(this.app.vault.on("rename",(e,r)=>{if(e instanceof X.TFile){this.folderNoteManager.onNoteRename(e,r).catch(()=>{}),this.hybridLinkManager.scheduleSyncForRename(e,r);return}e instanceof X.TFolder&&(this.folderNoteManager.onFolderRename(e,r).catch(()=>{}),this.hybridLinkManager.scheduleSyncForRename(e,r)),this.refreshDashboardBarViews(),this.dashboardLayoutManager.scheduleSync()})),this.app.workspace.onLayoutReady(()=>{this.dashboardLayoutManager.scheduleSync()}),this.registerEvent(this.app.workspace.on("layout-change",()=>{this.dashboardLayoutManager.scheduleSync(),this.resyncDashboardGraphEmbeds(),this.resyncDashboardNoteEmbeds(),this.resyncDashboardTicketEmbeds()})),this.registerEvent(this.app.workspace.on("active-leaf-change",()=>{this.dashboardLayoutManager.scheduleSync()}))}async handleFileCreated(e){e.extension==="md"&&await this.noteBootstrap.onFileCreated(e),this.hybridLinkManager.scheduleSyncForParentOf(e)}async createFolderNote(e){let r=await this.folderNoteManager.createFolderNote(e);return r?(await this.noteBootstrap.onFileCreated(r),this.hybridLinkManager.scheduleSyncForParentOf(r),await this.app.workspace.openLinkText(r.path,"",!1,{active:!0}),r):null}onunload(){document.body.removeClass("corvidae-hide-note-file-title"),document.body.removeClass("corvidae-show-note-file-title"),this.folderNoteCreateUI.onunload(),this.explorerManager.onunload(),this.dashboardGraphBoxEmbed.onunload(),this.dashboardCrowControl.onunload(),this.dashboardGraphBoxEmbed.detachAll(),this.dashboardNoteBoxEmbed.detachAll(),this.dashboardBrowserBoxEmbed.detachAll(),this.dashboardTerminalBoxEmbed.detachAll(),this.dashboardTicketBoxEmbed.detachAll(),this.legendManager.removeAll(this.getGraphLeaves()),this.stopPatchInterval()}applyNoteFileTitleVisibility(){document.body.toggleClass("corvidae-hide-note-file-title",!this.settings.showNoteFileTitle),document.body.toggleClass("corvidae-show-note-file-title",this.settings.showNoteFileTitle)}onLanguageChanged(){this.folderNoteCreateUI.refreshUi(),this.explorerManager.scheduleFolderRefresh(),this.registerCorvidaePropertyTypes(),this.refreshGraphFeatures(),this.refreshDashboardViews(),this.refreshTicketsViews(),this.customGraphManager.onLanguageChanged()}registerCorvidaePropertyTypes(){io(this.app,this.settings)}setupGraphHooks(){this.registerEvent(this.app.workspace.on("layout-change",()=>{this.refreshGraphFeatures()})),this.registerEvent(this.app.workspace.on("active-leaf-change",()=>{this.refreshGraphFeatures()})),this.startPatchInterval(),this.register(()=>this.stopPatchInterval())}startPatchInterval(){this.stopPatchInterval(),this.patchIntervalId=window.setInterval(()=>{this.refreshGraphFeatures()},this.settings.patchIntervalMs)}stopPatchInterval(){this.patchIntervalId!==null&&(window.clearInterval(this.patchIntervalId),this.patchIntervalId=null)}restartPatchInterval(){this.startPatchInterval()}refreshGraphFeatures(){let e=this.getGraphLeaves();if(e.length===0)return;this.graphPatcher.patchAllGraphs(e);let r=this.graphPatcher.collectLegendEntries(e);this.legendManager.syncLegends(e,r)}refreshDashboardViews(){for(let e of this.getDashboardViews())e.refresh()}refreshDashboardBarViews(){for(let e of this.getDashboardViews())e.isBarMode()&&e.refresh()}getDashboardViews(){let e=[];for(let r of this.app.workspace.getLeavesOfType(w))r.view instanceof j&&e.push(r.view);return e}resyncDashboardGraphEmbeds(){for(let e of this.getDashboardViews())e.resyncGraphEmbeds()}resyncDashboardNoteEmbeds(){for(let e of this.getDashboardViews())e.resyncNoteEmbeds()}resyncDashboardBrowserEmbeds(){for(let e of this.getDashboardViews())e.resyncBrowserEmbeds()}resyncDashboardTicketEmbeds(){for(let e of this.getDashboardViews())e.resyncTicketEmbeds()}previewBrowserBoxLink(e,r){for(let s of this.getDashboardViews())s.previewBrowserBoxLink(e,r)}refreshTicketsViews(){for(let e of this.getTicketsViews())e.refresh()}getTicketsViews(){let e=[];for(let r of this.app.workspace.getLeavesOfType(M))r.view instanceof Te&&e.push(r.view);return e}async activateDashboard(){let r=this.app.workspace.getLeavesOfType(w).find(i=>{let a=i.view;return a instanceof j&&!a.isBarMode()});if(r){await this.app.workspace.revealLeaf(r);return}await this.app.workspace.getLeaf(!1).setViewState({type:w,state:{mode:"full"},active:!0})}getGraphLeaves(){let e=this.app.workspace.getLeavesOfType("graph"),r=this.dashboardGraphBoxEmbed.getLeaves(),s=new Set,i=[];for(let a of[...e,...r])s.has(a)||(s.add(a),i.push(a));return i}async saveSettings(){let e=await this.loadData(),r=S(e)?e:{};await this.saveData({...r,...this.settings,dashboardBoxes:this.dashboardBoxStore.getBoxes()}),this.graphPatcher.updateSettings(this.settings),this.legendManager.updateSettings(this.settings),this.noteBootstrap.updateSettings(this.settings),this.folderNoteManager.updateSettings(this.settings),this.hybridLinkManager.updateSettings(this.settings),this.explorerManager.updateSettings(this.settings),this.ticketManager=new Se(this.app,this.noteBootstrap),this.registerCorvidaePropertyTypes()}async loadSettings(){let e=await this.loadData(),r=S(e)?e:{},{dashboardBoxes:s,...i}=r,a=Array.isArray(i.folderNoteExcludePrefixes);this.settings={...K},(i.language==="auto"||i.language==="en"||i.language==="de")&&(this.settings.language=i.language),typeof i.showLegend=="boolean"&&(this.settings.showLegend=i.showLegend),typeof i.legendShowDefaultAndUncolored=="boolean"&&(this.settings.legendShowDefaultAndUncolored=i.legendShowDefaultAndUncolored),typeof i.graphHideBaseEmbedLinks=="boolean"&&(this.settings.graphHideBaseEmbedLinks=i.graphHideBaseEmbedLinks),typeof i.graphOnlyFrontmatterLinks=="boolean"&&(this.settings.graphOnlyFrontmatterLinks=i.graphOnlyFrontmatterLinks),typeof i.autoFrontmatter=="boolean"&&(this.settings.autoFrontmatter=i.autoFrontmatter),typeof i.folderNoteEnabled=="boolean"&&(this.settings.folderNoteEnabled=i.folderNoteEnabled),typeof i.folderNoteSyncRename=="boolean"&&(this.settings.folderNoteSyncRename=i.folderNoteSyncRename),typeof i.folderNoteOpenOnClick=="boolean"&&(this.settings.folderNoteOpenOnClick=i.folderNoteOpenOnClick),typeof i.folderNoteHideInExplorer=="boolean"&&(this.settings.folderNoteHideInExplorer=i.folderNoteHideInExplorer),typeof i.dashboardAutoOpen=="boolean"&&(this.settings.dashboardAutoOpen=i.dashboardAutoOpen),typeof i.showNoteFileTitle=="boolean"&&(this.settings.showNoteFileTitle=i.showNoteFileTitle),typeof i.filePropertiesSidebarInitialized=="boolean"&&(this.settings.filePropertiesSidebarInitialized=i.filePropertiesSidebarInitialized),typeof i.sizeProperty=="string"&&(this.settings.sizeProperty=i.sizeProperty),typeof i.colorProperty=="string"&&(this.settings.colorProperty=i.colorProperty),typeof i.minSize=="number"&&(this.settings.minSize=i.minSize),typeof i.maxSize=="number"&&(this.settings.maxSize=i.maxSize),typeof i.defaultSize=="number"&&(this.settings.defaultSize=i.defaultSize),typeof i.defaultColor=="string"&&(this.settings.defaultColor=i.defaultColor),typeof i.patchIntervalMs=="number"&&(this.settings.patchIntervalMs=i.patchIntervalMs),typeof i.ticketsSidebarAutoOpen=="boolean"&&(this.settings.ticketsSidebarAutoOpen=i.ticketsSidebarAutoOpen),Array.isArray(i.defaultTags)&&(this.settings.defaultTags=i.defaultTags.filter(l=>typeof l=="string"));let n=this.app.vault.configDir;if(a?Array.isArray(i.folderNoteExcludePrefixes)&&(this.settings.folderNoteExcludePrefixes=i.folderNoteExcludePrefixes.filter(l=>typeof l=="string")):this.settings.folderNoteExcludePrefixes=[n,".trash"],Array.isArray(i.developmentFolders)&&(this.settings.developmentFolders=i.developmentFolders.filter(l=>typeof l=="string")),Array.isArray(i.customGraphs))this.settings.customGraphs=i.customGraphs.flatMap(l=>S(l)?typeof l.id!="string"?[]:typeof l.folder!="string"?[]:[{id:l.id,name:typeof l.name=="string"?l.name:"",folder:l.folder,codeFolder:typeof l.codeFolder=="string"?l.codeFolder:""}]:[]);else if(typeof i.customGraphFolder=="string"){let l=i.customGraphFolder.trim();this.settings.customGraphs=l?[{id:$e(),name:"Custom Graph",folder:l,codeFolder:""}]:[]}Array.isArray(i.ticketProjects)?this.settings.ticketProjects=i.ticketProjects.flatMap(l=>S(l)?typeof l.id!="string"?[]:typeof l.name!="string"?[]:typeof l.undoneFolder!="string"?[]:typeof l.doneFolder!="string"?[]:[{id:l.id,name:l.name,undoneFolder:l.undoneFolder,doneFolder:l.doneFolder,developmentLogPath:typeof l.developmentLogPath=="string"?l.developmentLogPath:""}]:[]):this.settings.ticketProjects=[],this.dashboardBoxStore.loadFromData(e)}};
