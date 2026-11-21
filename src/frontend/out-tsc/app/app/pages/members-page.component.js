import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MemberService } from '../core/services/member.service';
import { CommunityService } from '../core/services/community.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
function MembersPageComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 23);
    i0.ɵɵlistener("click", function MembersPageComponent_Conditional_16_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.memberService.clearError()); });
    i0.ɵɵtext(4, "\u00D7");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx);
} }
function MembersPageComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 9)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 23);
    i0.ɵɵlistener("click", function MembersPageComponent_Conditional_17_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.successMessage.set(null)); });
    i0.ɵɵtext(4, "\u00D7");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx);
} }
function MembersPageComponent_Conditional_18_For_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 34);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const comm_r5 = ctx.$implicit;
    i0.ɵɵproperty("value", comm_r5.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", comm_r5.name, " ", comm_r5.isMainParish ? "(Matriz)" : "", " ");
} }
function MembersPageComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 10)(1, "div", 24)(2, "h3");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 23);
    i0.ɵɵlistener("click", function MembersPageComponent_Conditional_18_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.cancelForm()); });
    i0.ɵɵtext(5, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "form", 25);
    i0.ɵɵlistener("ngSubmit", function MembersPageComponent_Conditional_18_Template_form_ngSubmit_6_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitMember()); });
    i0.ɵɵelementStart(7, "div", 26)(8, "div", 27)(9, "label", 28);
    i0.ɵɵtext(10, "Nome Completo *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "input", 29);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 30)(13, "label", 31);
    i0.ɵɵtext(14, "Comunidade Pertencente *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "select", 32)(16, "option", 33);
    i0.ɵɵtext(17, "Selecione a comunidade...");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(18, MembersPageComponent_Conditional_18_For_19_Template, 2, 3, "option", 34, _forTrack0);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(20, "div", 26)(21, "div", 30)(22, "label", 35);
    i0.ɵɵtext(23, "Data de Nascimento");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(24, "input", 36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "div", 30)(26, "label", 37);
    i0.ɵɵtext(27, "Telefone / WhatsApp");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(28, "input", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "div", 30)(30, "label", 39);
    i0.ɵɵtext(31, "E-mail");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(32, "input", 40);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "div", 26)(34, "div", 27)(35, "label", 41);
    i0.ɵɵtext(36, "Pastoral / Movimento / Minist\u00E9rio");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(37, "input", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "div", 30)(39, "label", 43);
    i0.ɵɵtext(40, "Situa\u00E7\u00E3o Cadastral");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "select", 44)(42, "option", 45);
    i0.ɵɵtext(43, "Ativo / Participante");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "option", 46);
    i0.ɵɵtext(45, "Inativo");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(46, "div", 47)(47, "label", 48);
    i0.ɵɵelement(48, "input", 49);
    i0.ɵɵelementStart(49, "span");
    i0.ɵɵtext(50, "\u2B50 \u00C9 Dizimista Ativo");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(51, "div", 50)(52, "button", 51);
    i0.ɵɵlistener("click", function MembersPageComponent_Conditional_18_Template_button_click_52_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.cancelForm()); });
    i0.ɵɵtext(53, "Cancelar");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "button", 52);
    i0.ɵɵtext(55);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.editingMemberId() ? "Editar Membro: " + ((tmp_1_0 = ctx_r1.memberForm.get("name")) == null ? null : tmp_1_0.value) : "Cadastrar Novo Membro");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("formGroup", ctx_r1.memberForm);
    i0.ɵɵadvance(12);
    i0.ɵɵrepeater(ctx_r1.communityService.communities());
    i0.ɵɵadvance(36);
    i0.ɵɵproperty("disabled", ctx_r1.memberForm.invalid || ctx_r1.memberService.loading());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.editingMemberId() ? "Atualizar Membro" : "Salvar Membro", " ");
} }
function MembersPageComponent_Conditional_19_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 64)(1, "label", 67);
    i0.ɵɵtext(2, "Descreva o motivo:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 68);
    i0.ɵɵtwoWayListener("ngModelChange", function MembersPageComponent_Conditional_19_Conditional_27_Template_input_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.customReason, $event) || (ctx_r1.customReason = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.customReason);
} }
function MembersPageComponent_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 53);
    i0.ɵɵlistener("click", function MembersPageComponent_Conditional_19_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeInactivateModal()); });
    i0.ɵɵelementStart(1, "div", 54);
    i0.ɵɵlistener("click", function MembersPageComponent_Conditional_19_Template_div_click_1_listener($event) { i0.ɵɵrestoreView(_r6); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelementStart(2, "div", 55)(3, "h3");
    i0.ɵɵtext(4, "Inativar Membro Pastoral");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 23);
    i0.ɵɵlistener("click", function MembersPageComponent_Conditional_19_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeInactivateModal()); });
    i0.ɵɵtext(6, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 56)(8, "p");
    i0.ɵɵtext(9, "Voc\u00EA est\u00E1 prestes a inativar o cadastro de ");
    i0.ɵɵelementStart(10, "strong");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(12, ".");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 30)(14, "label", 57);
    i0.ɵɵtext(15, "Motivo da Inativa\u00E7\u00E3o *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "select", 58);
    i0.ɵɵtwoWayListener("ngModelChange", function MembersPageComponent_Conditional_19_Template_select_ngModelChange_16_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.selectedReason, $event) || (ctx_r1.selectedReason = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("change", function MembersPageComponent_Conditional_19_Template_select_change_16_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onReasonSelectChange()); });
    i0.ɵɵelementStart(17, "option", 59);
    i0.ɵɵtext(18, "Mudan\u00E7a de Par\u00F3quia");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "option", 60);
    i0.ɵɵtext(20, "Pedido do Membro");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "option", 61);
    i0.ɵɵtext(22, "Falecimento");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "option", 62);
    i0.ɵɵtext(24, "Afastamento Pastoral");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "option", 63);
    i0.ɵɵtext(26, "Outro motivo especificado...");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(27, MembersPageComponent_Conditional_19_Conditional_27_Template, 4, 1, "div", 64);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "div", 65)(29, "button", 51);
    i0.ɵɵlistener("click", function MembersPageComponent_Conditional_19_Template_button_click_29_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeInactivateModal()); });
    i0.ɵɵtext(30, "Cancelar");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "button", 66);
    i0.ɵɵlistener("click", function MembersPageComponent_Conditional_19_Template_button_click_31_listener() { const target_r8 = i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.confirmInactivation(target_r8)); });
    i0.ɵɵtext(32, " Confirmar Inativa\u00E7\u00E3o ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate(ctx.name);
    i0.ɵɵadvance(5);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.selectedReason);
    i0.ɵɵadvance(11);
    i0.ɵɵconditional(ctx_r1.selectedReason === "Outro" ? 27 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r1.memberService.loading());
} }
function MembersPageComponent_Conditional_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵelement(1, "div", 69);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Carregando membros da comunidade...");
    i0.ɵɵelementEnd()();
} }
function MembersPageComponent_Conditional_44_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 70);
    i0.ɵɵelement(2, "path", 71)(3, "circle", 72)(4, "path", 73)(5, "path", 74);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, "Nenhum membro cadastrado nesta comunidade.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 7);
    i0.ɵɵlistener("click", function MembersPageComponent_Conditional_44_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleForm()); });
    i0.ɵɵtext(9, "Cadastrar Primeiro Membro");
    i0.ɵɵelementEnd()();
} }
function MembersPageComponent_Conditional_45_For_22_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 79);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const m_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Motivo: ", m_r11.inactiveReason, "");
} }
function MembersPageComponent_Conditional_45_For_22_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 81);
    i0.ɵɵtext(1, "\u2B50 Dizimista");
    i0.ɵɵelementEnd();
} }
function MembersPageComponent_Conditional_45_For_22_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 82);
    i0.ɵɵtext(1, "Membro");
    i0.ɵɵelementEnd();
} }
function MembersPageComponent_Conditional_45_For_22_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const m_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(m_r11.phone);
} }
function MembersPageComponent_Conditional_45_For_22_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 84);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const m_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(m_r11.email);
} }
function MembersPageComponent_Conditional_45_For_22_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 84);
    i0.ɵɵtext(1, "-");
    i0.ɵɵelementEnd();
} }
function MembersPageComponent_Conditional_45_For_22_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 86);
    i0.ɵɵtext(1, "\u25CF Ativo");
    i0.ɵɵelementEnd();
} }
function MembersPageComponent_Conditional_45_For_22_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 87);
    i0.ɵɵtext(1, "\u25CF Inativo");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const m_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("title", m_r11.inactiveReason ? "Motivo: " + m_r11.inactiveReason : "Inativo");
} }
function MembersPageComponent_Conditional_45_For_22_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 92);
    i0.ɵɵlistener("click", function MembersPageComponent_Conditional_45_For_22_Conditional_29_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r12); const m_r11 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openInactivateModal(m_r11)); });
    i0.ɵɵtext(1, " Inativar ");
    i0.ɵɵelementEnd();
} }
function MembersPageComponent_Conditional_45_For_22_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 93);
    i0.ɵɵlistener("click", function MembersPageComponent_Conditional_45_For_22_Conditional_30_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r13); const m_r11 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.reactivateMember(m_r11)); });
    i0.ɵɵtext(1, " Reativar ");
    i0.ɵɵelementEnd();
} }
function MembersPageComponent_Conditional_45_For_22_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "div", 78)(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, MembersPageComponent_Conditional_45_For_22_Conditional_5_Template, 2, 1, "span", 79);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td")(7, "span", 80);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵtemplate(10, MembersPageComponent_Conditional_45_For_22_Conditional_10_Template, 2, 0, "span", 81)(11, MembersPageComponent_Conditional_45_For_22_Conditional_11_Template, 2, 0, "span", 82);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td")(15, "div", 83);
    i0.ɵɵtemplate(16, MembersPageComponent_Conditional_45_For_22_Conditional_16_Template, 2, 1, "span")(17, MembersPageComponent_Conditional_45_For_22_Conditional_17_Template, 2, 1, "small", 84)(18, MembersPageComponent_Conditional_45_For_22_Conditional_18_Template, 2, 0, "span", 84);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "td", 85);
    i0.ɵɵtext(20);
    i0.ɵɵpipe(21, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "td");
    i0.ɵɵtemplate(23, MembersPageComponent_Conditional_45_For_22_Conditional_23_Template, 2, 0, "span", 86)(24, MembersPageComponent_Conditional_45_For_22_Conditional_24_Template, 2, 1, "span", 87);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "td", 76)(26, "div", 88)(27, "button", 89);
    i0.ɵɵlistener("click", function MembersPageComponent_Conditional_45_For_22_Template_button_click_27_listener() { const m_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.startEdit(m_r11)); });
    i0.ɵɵtext(28, " \u270F\uFE0F Editar ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(29, MembersPageComponent_Conditional_45_For_22_Conditional_29_Template, 2, 0, "button", 90)(30, MembersPageComponent_Conditional_45_For_22_Conditional_30_Template, 2, 0, "button", 91);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const m_r11 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("row-steward", ctx_r1.isActive(m_r11) && (m_r11.isSteward || m_r11.ministry && m_r11.ministry.toLowerCase().includes("d\u00EDzim")))("row-inactive", !ctx_r1.isActive(m_r11));
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("text-muted", !ctx_r1.isActive(m_r11));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(m_r11.name);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r1.isActive(m_r11) && m_r11.inactiveReason ? 5 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.getCommunityName(m_r11.communityId));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(m_r11.isSteward || m_r11.ministry && m_r11.ministry.toLowerCase().includes("d\u00EDzim") ? 10 : 11);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(m_r11.ministry || "Comunidade");
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(m_r11.phone ? 16 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(m_r11.email ? 17 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!m_r11.phone && !m_r11.email ? 18 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(m_r11.birthDate ? i0.ɵɵpipeBind2(21, 17, m_r11.birthDate, "dd/MM/yyyy") : "-");
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.isActive(m_r11) ? 23 : 24);
    i0.ɵɵadvance(6);
    i0.ɵɵconditional(ctx_r1.isActive(m_r11) ? 29 : 30);
} }
function MembersPageComponent_Conditional_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22)(1, "table", 75)(2, "thead")(3, "tr")(4, "th");
    i0.ɵɵtext(5, "Nome do Irm\u00E3o(\u00E3)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "th");
    i0.ɵɵtext(7, "Comunidade");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th");
    i0.ɵɵtext(9, "Status D\u00EDzimo");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th");
    i0.ɵɵtext(11, "Pastoral / Servi\u00E7o");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th");
    i0.ɵɵtext(13, "Contato");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "th");
    i0.ɵɵtext(15, "Data Nasc.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th");
    i0.ɵɵtext(17, "Situa\u00E7\u00E3o");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "th", 76);
    i0.ɵɵtext(19, "A\u00E7\u00F5es");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(20, "tbody");
    i0.ɵɵrepeaterCreate(21, MembersPageComponent_Conditional_45_For_22_Template, 31, 20, "tr", 77, _forTrack0);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(21);
    i0.ɵɵrepeater(ctx_r1.sortedMembers());
} }
export class MembersPageComponent {
    memberService = inject(MemberService);
    communityService = inject(CommunityService);
    fb = inject(FormBuilder);
    showForm = signal(false);
    editingMemberId = signal(null);
    inactivatingMember = signal(null);
    successMessage = signal(null);
    selectedReason = 'Mudança de Paróquia';
    customReason = '';
    // Ordenação inteligente: Dizimistas fiéis no topo da lista, seguidos pelos demais em ordem alfabética
    sortedMembers = computed(() => {
        return [...this.memberService.members()].sort((a, b) => {
            const aActive = this.isActive(a) ? 1 : 0;
            const bActive = this.isActive(b) ? 1 : 0;
            if (bActive !== aActive) {
                return bActive - aActive; // Ativos primeiro
            }
            const aSteward = (a.isSteward || (a.ministry && a.ministry.toLowerCase().includes('dízim'))) ? 1 : 0;
            const bSteward = (b.isSteward || (b.ministry && b.ministry.toLowerCase().includes('dízim'))) ? 1 : 0;
            if (bSteward !== aSteward) {
                return bSteward - aSteward; // Dizimistas no topo
            }
            return a.name.localeCompare(b.name, 'pt-BR');
        });
    });
    memberForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        communityId: ['', Validators.required],
        birthDate: [''],
        phone: [''],
        email: [''],
        ministry: [''],
        status: ['ACTIVE', Validators.required],
        isSteward: [false],
    });
    constructor() {
        // Reage automaticamente à mudança de comunidade ativa no header
        effect(() => {
            const activeId = this.communityService.activeCommunityId();
            this.memberService.loadMembers(activeId).subscribe();
        });
    }
    ngOnInit() {
        if (this.communityService.communities().length === 0) {
            this.communityService.loadCommunities().subscribe();
        }
    }
    refresh() {
        this.memberService.loadMembers(this.communityService.activeCommunityId()).subscribe();
    }
    isActive(m) {
        return m.status === 'ACTIVE' || m.status === 'ATIVO';
    }
    toggleForm() {
        if (this.showForm() && !this.editingMemberId()) {
            this.showForm.set(false);
            return;
        }
        this.editingMemberId.set(null);
        this.showForm.set(true);
        const activeId = this.communityService.activeCommunityId();
        const defaultComm = (activeId && activeId !== 'ALL')
            ? activeId
            : (this.communityService.communities()[0]?.id || '');
        this.memberForm.reset({
            communityId: defaultComm,
            status: 'ACTIVE',
            isSteward: false,
        });
    }
    cancelForm() {
        this.showForm.set(false);
        this.editingMemberId.set(null);
        this.memberForm.reset({ status: 'ACTIVE', isSteward: false });
    }
    startEdit(member) {
        this.editingMemberId.set(member.id);
        this.showForm.set(true);
        this.memberForm.patchValue({
            name: member.name,
            communityId: member.communityId,
            birthDate: member.birthDate || '',
            phone: member.phone || '',
            email: member.email || '',
            ministry: member.ministry || '',
            status: this.isActive(member) ? 'ACTIVE' : 'INACTIVE',
            isSteward: Boolean(member.isSteward || (member.ministry && member.ministry.toLowerCase().includes('dízim'))),
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    submitMember() {
        if (this.memberForm.invalid) {
            this.memberForm.markAllAsTouched();
            return;
        }
        const val = this.memberForm.getRawValue();
        const dto = {
            name: val.name,
            communityId: val.communityId,
            birthDate: val.birthDate || undefined,
            phone: val.phone || undefined,
            email: val.email || undefined,
            ministry: val.ministry || undefined,
            status: val.status || 'ACTIVE',
            isSteward: Boolean(val.isSteward),
        };
        const editId = this.editingMemberId();
        if (editId) {
            this.memberService.updateMember(editId, dto).subscribe({
                next: () => {
                    this.successMessage.set(`Dados do membro "${dto.name}" atualizados com sucesso!`);
                    this.cancelForm();
                },
            });
        }
        else {
            this.memberService.createMember(dto).subscribe({
                next: () => {
                    this.successMessage.set(`Membro "${dto.name}" cadastrado com sucesso!`);
                    this.cancelForm();
                },
            });
        }
    }
    openInactivateModal(member) {
        this.inactivatingMember.set(member);
        this.selectedReason = 'Mudança de Paróquia';
        this.customReason = '';
    }
    closeInactivateModal() {
        this.inactivatingMember.set(null);
    }
    onReasonSelectChange() {
        if (this.selectedReason !== 'Outro') {
            this.customReason = '';
        }
    }
    confirmInactivation(member) {
        const finalReason = this.selectedReason === 'Outro' && this.customReason.trim()
            ? this.customReason.trim()
            : this.selectedReason;
        this.memberService.inactivateMember(member.id, finalReason).subscribe({
            next: () => {
                this.successMessage.set(`Membro "${member.name}" inativado com sucesso. Motivo: ${finalReason}`);
                this.closeInactivateModal();
            },
        });
    }
    reactivateMember(member) {
        if (confirm(`Deseja reativar o membro pastoral "${member.name}"?`)) {
            this.memberService.updateMember(member.id, { status: 'ACTIVE', inactiveReason: undefined }).subscribe({
                next: () => {
                    this.successMessage.set(`Membro "${member.name}" reativado com sucesso!`);
                },
            });
        }
    }
    getCommunityName(communityId) {
        const comm = this.communityService.communities().find((c) => c.id === communityId);
        return comm ? comm.name : 'Matriz Paroquial';
    }
    // Gera folha impressa/PDF limpa e profissional com a listagem de dizimistas
    generateStewardSheet() {
        const stewards = this.sortedMembers().filter((m) => m.isSteward || (m.ministry && m.ministry.toLowerCase().includes('dízim')));
        const commName = this.communityService.activeCommunity()?.name || 'Visão Paroquial (Todas as Comunidades)';
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert('Por favor, permita a abertura de pop-ups para gerar a folha de dizimistas.');
            return;
        }
        const currentDate = new Date().toLocaleDateString('pt-BR');
        const rowsHtml = stewards.map((m, idx) => `
      <tr>
        <td style="text-align: center; font-weight: bold;">${idx + 1}</td>
        <td><strong>${m.name}</strong></td>
        <td style="text-align: center;">${m.birthDate ? new Date(m.birthDate + 'T00:00:00').toLocaleDateString('pt-BR') : '-'}</td>
        <td>${m.phone || m.email || '-'}</td>
        <td style="text-align: center;">
          <span style="color: ${(m.status === 'ACTIVE' || m.status === 'ATIVO') ? '#15803d' : '#b91c1c'}; font-weight: 600;">
            ${(m.status === 'ACTIVE' || m.status === 'ATIVO') ? 'Ativo' : 'Inativo'}
          </span>
        </td>
        <td style="width: 140px; border-bottom: 1px dotted #94a3b8;">&nbsp;</td>
      </tr>
    `).join('');
        const html = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="utf-8">
        <title>Folha de Dizimistas - ${commName}</title>
        <style>
          @page { size: A4 portrait; margin: 1.5cm; }
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #1e293b; margin: 0; padding: 25px; font-size: 11pt; }
          .header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 18px; }
          .header h1 { margin: 0 0 4px 0; font-size: 16pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; }
          .header p { margin: 3px 0; font-size: 10pt; color: #475569; }
          .info-bar { display: flex; justify-content: space-between; font-size: 9.5pt; color: #64748b; margin-bottom: 14px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th { background: #f1f5f9; color: #334155; font-size: 9pt; text-transform: uppercase; font-weight: 700; padding: 8px; border: 1px solid #cbd5e1; }
          td { padding: 8px 10px; border: 1px solid #e2e8f0; font-size: 9.5pt; vertical-align: middle; }
          tr:nth-child(even) { background-color: #f8fafc; }
          .footer { margin-top: 35px; text-align: center; font-size: 8.5pt; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 10px; }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom: 16px; display: flex; gap: 10px; justify-content: flex-end;">
          <button onclick="window.print()" style="padding: 8px 18px; background: #0284c7; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">
            🖨️ Imprimir / Salvar PDF
          </button>
          <button onclick="window.close()" style="padding: 8px 18px; background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer;">
            Fechar
          </button>
        </div>
        <div class="header">
          <h1>EcoEcclesia • Folha de Controle de Dizimistas</h1>
          <p><strong>Comunidade:</strong> ${commName}</p>
          <p>Pastoral do Dízimo • Registro e Fidelidade dos Fiéis</p>
        </div>
        <div class="info-bar">
          <span><strong>Total de Dizimistas Cadastrados:</strong> ${stewards.length}</span>
          <span><strong>Data de Emissão:</strong> ${currentDate}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th style="width: 35px; text-align: center;">#</th>
              <th>Nome Completo</th>
              <th style="width: 110px; text-align: center;">Data Nasc.</th>
              <th>Contato (Tel / E-mail)</th>
              <th style="width: 85px; text-align: center;">Situação</th>
              <th style="width: 140px; text-align: center;">Assinatura / Mês</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml || '<tr><td colspan="6" style="text-align: center; padding: 25px; color: #94a3b8;">Nenhum dizimista registrado nesta comunidade.</td></tr>'}
          </tbody>
        </table>
        <div class="footer">
          <p>Documento gerado automaticamente pelo EcoEcclesia Gestão Eclesial • Que São João Bosco abençoe vossa fidelidade à Igreja.</p>
        </div>
      </body>
      </html>
    `;
        printWindow.document.open();
        printWindow.document.write(html);
        printWindow.document.close();
    }
    static ɵfac = function MembersPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MembersPageComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MembersPageComponent, selectors: [["app-members-page"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 46, vars: 12, consts: [[1, "members-container"], [1, "page-header"], [1, "badge-tag"], [1, "subtitle"], [1, "header-actions"], ["type", "button", "title", "Gerar folha de d\u00EDzimo para impress\u00E3o/PDF", 1, "btn", "btn-outline-print", 3, "click"], ["type", "button", 1, "btn", "btn-secondary", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "alert", "alert-error"], [1, "alert", "alert-success"], [1, "card", "form-card"], [1, "modal-backdrop"], [1, "kpi-strip"], [1, "kpi-card"], [1, "label"], [1, "value", "text-primary"], [1, "hint"], [1, "value", "text-success"], [1, "value", "text-focus"], [1, "card", "table-card"], [1, "loading-state"], [1, "empty-state"], [1, "table-responsive"], [1, "btn-close", 3, "click"], [1, "card-title-bar"], [1, "member-form", 3, "ngSubmit", "formGroup"], [1, "form-row"], [1, "field", "flex-2"], ["for", "name"], ["id", "name", "type", "text", "formControlName", "name", "placeholder", "Ex: Francisco de Assis Silva"], [1, "field"], ["for", "communityId"], ["id", "communityId", "formControlName", "communityId"], ["value", "", "disabled", ""], [3, "value"], ["for", "birthDate"], ["id", "birthDate", "type", "date", "formControlName", "birthDate"], ["for", "phone"], ["id", "phone", "type", "text", "formControlName", "phone", "placeholder", "(11) 98765-4321"], ["for", "email"], ["id", "email", "type", "email", "formControlName", "email", "placeholder", "membro@email.com"], ["for", "ministry"], ["id", "ministry", "type", "text", "formControlName", "ministry", "placeholder", "Ex: Pastoral do D\u00EDzimo, Coral, Catequese, Liturgia"], ["for", "status"], ["id", "status", "formControlName", "status"], ["value", "ACTIVE"], ["value", "INACTIVE"], [1, "field", "field-checkbox"], ["for", "isSteward", 1, "checkbox-label"], ["id", "isSteward", "type", "checkbox", "formControlName", "isSteward"], [1, "form-actions"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "modal-backdrop", 3, "click"], [1, "modal-card", 3, "click"], [1, "modal-header"], [1, "modal-body"], ["for", "inactiveReason"], ["id", "inactiveReason", 3, "ngModelChange", "change", "ngModel"], ["value", "Mudan\u00E7a de Par\u00F3quia"], ["value", "Pedido do Membro"], ["value", "Falecimento"], ["value", "Afastamento Pastoral"], ["value", "Outro"], [1, "field", 2, "margin-top", "0.75rem"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-danger", 3, "click", "disabled"], ["for", "customReason"], ["id", "customReason", "type", "text", "placeholder", "Descreva brevemente o motivo...", 3, "ngModelChange", "ngModel"], [1, "spinner-large"], ["viewBox", "0 0 24 24", "width", "48", "height", "48", "fill", "none", "stroke", "#94a3b8", "stroke-width", "1.5"], ["d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["d", "M23 21v-2a4 4 0 0 0-3-3.87"], ["d", "M16 3.13a4 4 0 0 1 0 7.75"], [1, "data-table"], [1, "text-right"], [3, "row-steward", "row-inactive"], [1, "member-name"], [1, "reason-tag"], [1, "community-tag"], [1, "badge", "badge-steward"], [1, "badge", "badge-default"], [1, "contact-info"], [1, "text-muted"], [1, "col-date"], [1, "badge", "badge-active"], [1, "badge", "badge-inactive", 3, "title"], [1, "actions-cell"], ["type", "button", "title", "Editar dados do membro", 1, "btn-action", "btn-action-edit", 3, "click"], ["type", "button", "title", "Inativar membro", 1, "btn-action", "btn-action-inactivate"], ["type", "button", "title", "Reativar membro", 1, "btn-action", "btn-action-reactivate"], ["type", "button", "title", "Inativar membro", 1, "btn-action", "btn-action-inactivate", 3, "click"], ["type", "button", "title", "Reativar membro", 1, "btn-action", "btn-action-reactivate", 3, "click"]], template: function MembersPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "span", 2);
            i0.ɵɵtext(4, "Pastoral & Comunh\u00E3o");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1");
            i0.ɵɵtext(6, "Membros & Dizimistas");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 3);
            i0.ɵɵtext(8, "Cadastro pastoral, fidelidade ao d\u00EDzimo e gest\u00E3o de fi\u00E9is por comunidade.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 4)(10, "button", 5);
            i0.ɵɵlistener("click", function MembersPageComponent_Template_button_click_10_listener() { return ctx.generateStewardSheet(); });
            i0.ɵɵtext(11, " \uD83D\uDCC4 Gerar Folha de Dizimistas ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "button", 6);
            i0.ɵɵlistener("click", function MembersPageComponent_Template_button_click_12_listener() { return ctx.refresh(); });
            i0.ɵɵtext(13, " Atualizar ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "button", 7);
            i0.ɵɵlistener("click", function MembersPageComponent_Template_button_click_14_listener() { return ctx.toggleForm(); });
            i0.ɵɵtext(15, " + Novo Membro ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(16, MembersPageComponent_Conditional_16_Template, 5, 1, "div", 8)(17, MembersPageComponent_Conditional_17_Template, 5, 1, "div", 9)(18, MembersPageComponent_Conditional_18_Template, 56, 4, "section", 10)(19, MembersPageComponent_Conditional_19_Template, 33, 4, "div", 11);
            i0.ɵɵelementStart(20, "section", 12)(21, "div", 13)(22, "span", 14);
            i0.ɵɵtext(23, "Total de Membros");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "strong", 15);
            i0.ɵɵtext(25);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "span", 16);
            i0.ɵɵtext(27);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "div", 13)(29, "span", 14);
            i0.ɵɵtext(30, "Dizimistas Fi\u00E9is");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "strong", 17);
            i0.ɵɵtext(32);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "span", 16);
            i0.ɵɵtext(34, "Contribui\u00E7\u00E3o regular (destacados no topo)");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(35, "div", 13)(36, "span", 14);
            i0.ɵɵtext(37, "Comunidade em Foco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "strong", 18);
            i0.ɵɵtext(39);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "span", 16);
            i0.ɵɵtext(41);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(42, "section", 19);
            i0.ɵɵtemplate(43, MembersPageComponent_Conditional_43_Template, 4, 0, "div", 20)(44, MembersPageComponent_Conditional_44_Template, 10, 0, "div", 21)(45, MembersPageComponent_Conditional_45_Template, 23, 0, "div", 22);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            let tmp_1_0;
            let tmp_2_0;
            let tmp_4_0;
            let tmp_8_0;
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("disabled", ctx.memberService.loading());
            i0.ɵɵadvance(4);
            i0.ɵɵconditional((tmp_1_0 = ctx.memberService.error()) ? 16 : -1, tmp_1_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_2_0 = ctx.successMessage()) ? 17 : -1, tmp_2_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showForm() ? 18 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_4_0 = ctx.inactivatingMember()) ? 19 : -1, tmp_4_0);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.memberService.totalCount());
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate2("", ctx.memberService.activeCount(), " ativo(s) \u2022 ", ctx.memberService.inactiveCount(), " inativo(s)");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.memberService.stewardsCount());
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate1(" ", ((tmp_8_0 = ctx.communityService.activeCommunity()) == null ? null : tmp_8_0.name) || "Vis\u00E3o Geral (Todas)", " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.communityService.isAll() ? "Consolidado da Par\u00F3quia" : "Filtrado pela barra superior");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.memberService.loading() && ctx.memberService.members().length === 0 ? 43 : ctx.memberService.members().length === 0 ? 44 : 45);
        } }, dependencies: [CommonModule, i1.DatePipe, FormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.CheckboxControlValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.NgModel, ReactiveFormsModule, i2.FormGroupDirective, i2.FormControlName], styles: [".members-container[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 1.5rem; }\n    .page-header[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }\n    .page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { font-size: 1.75rem; color: #0f172a; margin: 0.2rem 0; font-weight: 700; }\n    .subtitle[_ngcontent-%COMP%] { color: #64748b; font-size: 0.9rem; margin: 0; }\n    .badge-tag[_ngcontent-%COMP%] { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; background: #e0f2fe; color: #0369a1; padding: 0.2rem 0.6rem; border-radius: 9999px; }\n    .header-actions[_ngcontent-%COMP%] { display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; }\n\n    .card[_ngcontent-%COMP%] { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }\n    .card-title-bar[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }\n    .card-title-bar[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 0; font-size: 1.15rem; color: #0f172a; font-weight: 600; }\n\n    .member-form[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 1rem; }\n    .form-row[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: 1rem; }\n    .field[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 0.35rem; flex: 1; min-width: 160px; }\n    .flex-2[_ngcontent-%COMP%] { flex: 2; }\n    .field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] { font-size: 0.8rem; font-weight: 600; color: #475569; }\n    .field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] { padding: 0.55rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem; outline: none; }\n    .field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, .field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus { border-color: #0284c7; box-shadow: 0 0 0 2px rgba(2, 132, 199, 0.15); }\n    .field-checkbox[_ngcontent-%COMP%] { justify-content: flex-end; padding-bottom: 0.3rem; }\n    .checkbox-label[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; font-size: 0.875rem; font-weight: 600; color: #0f172a; }\n    .checkbox-label[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { width: 1.1rem; height: 1.1rem; cursor: pointer; }\n    .form-actions[_ngcontent-%COMP%] { display: flex; justify-content: flex-end; gap: 0.6rem; margin-top: 0.5rem; }\n\n    .kpi-strip[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }\n    .kpi-card[_ngcontent-%COMP%] { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1.2rem; display: flex; flex-direction: column; gap: 0.25rem; box-shadow: 0 1px 2px rgba(0,0,0,0.03); }\n    .kpi-card[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] { font-size: 0.8rem; font-weight: 600; color: #64748b; text-transform: uppercase; }\n    .kpi-card[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] { font-size: 1.6rem; font-weight: 700; }\n    .kpi-card[_ngcontent-%COMP%]   .hint[_ngcontent-%COMP%] { font-size: 0.75rem; color: #94a3b8; }\n    .text-primary[_ngcontent-%COMP%] { color: #0284c7; }\n    .text-success[_ngcontent-%COMP%] { color: #16a34a; }\n    .text-focus[_ngcontent-%COMP%] { color: #0f172a; font-size: 1.25rem !important; }\n\n    .table-card[_ngcontent-%COMP%] { padding: 0; overflow: hidden; }\n    .table-responsive[_ngcontent-%COMP%] { overflow-x: auto; }\n    .data-table[_ngcontent-%COMP%] { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem; }\n    .data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] { background: #f8fafc; color: #475569; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; padding: 0.75rem 1rem; border-bottom: 1px solid #e2e8f0; }\n    .data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] { padding: 0.85rem 1rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }\n    .row-steward[_ngcontent-%COMP%] { background-color: #fafffd; }\n    .row-inactive[_ngcontent-%COMP%] { background-color: #fcfcfd; opacity: 0.8; }\n    .col-date[_ngcontent-%COMP%] { white-space: nowrap; color: #64748b; font-size: 0.8rem; }\n    .member-name[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 0.2rem; }\n    .member-name[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: #0f172a; font-size: 0.9rem; }\n    .reason-tag[_ngcontent-%COMP%] { font-size: 0.72rem; color: #b91c1c; font-style: italic; }\n    .community-tag[_ngcontent-%COMP%] { font-size: 0.75rem; font-weight: 600; color: #0369a1; background: #f0f9ff; padding: 0.2rem 0.5rem; border-radius: 4px; border: 1px solid #e0f2fe; }\n\n    .contact-info[_ngcontent-%COMP%] { display: flex; flex-direction: column; line-height: 1.2; }\n\n    .badge[_ngcontent-%COMP%] { font-size: 0.75rem; font-weight: 600; padding: 0.2rem 0.55rem; border-radius: 9999px; display: inline-flex; align-items: center; gap: 0.2rem; }\n    .badge-steward[_ngcontent-%COMP%] { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; font-weight: 700; }\n    .badge-default[_ngcontent-%COMP%] { background: #f1f5f9; color: #475569; }\n    .badge-active[_ngcontent-%COMP%] { background: #ecfdf5; color: #047857; font-weight: 600; border: 1px solid #a7f3d0; }\n    .badge-inactive[_ngcontent-%COMP%] { background: #fee2e2; color: #b91c1c; font-weight: 600; border: 1px solid #fecaca; }\n\n    .text-muted[_ngcontent-%COMP%] { color: #94a3b8; }\n    .text-right[_ngcontent-%COMP%] { text-align: right; }\n\n    .actions-cell[_ngcontent-%COMP%] { display: inline-flex; gap: 0.5rem; justify-content: flex-end; align-items: center; }\n    .btn-action[_ngcontent-%COMP%] { background: none; border: none; cursor: pointer; font-size: 0.8rem; font-weight: 600; padding: 0.25rem 0.5rem; border-radius: 4px; transition: background 0.15s ease; }\n    .btn-action-edit[_ngcontent-%COMP%] { color: #0284c7; background: #f0f9ff; border: 1px solid #bae6fd; }\n    .btn-action-edit[_ngcontent-%COMP%]:hover { background: #e0f2fe; }\n    .btn-action-inactivate[_ngcontent-%COMP%] { color: #dc2626; background: #fef2f2; border: 1px solid #fecaca; }\n    .btn-action-inactivate[_ngcontent-%COMP%]:hover { background: #fee2e2; }\n    .btn-action-reactivate[_ngcontent-%COMP%] { color: #059669; background: #ecfdf5; border: 1px solid #a7f3d0; }\n    .btn-action-reactivate[_ngcontent-%COMP%]:hover { background: #d1fae5; }\n\n    .btn[_ngcontent-%COMP%] { padding: 0.6rem 1rem; border-radius: 8px; font-weight: 500; font-size: 0.875rem; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 0.4rem; transition: background 0.15s ease; }\n    .btn-primary[_ngcontent-%COMP%] { background: #0284c7; color: #fff; }\n    .btn-primary[_ngcontent-%COMP%]:hover { background: #0369a1; }\n    .btn-secondary[_ngcontent-%COMP%] { background: #fff; color: #334155; border: 1px solid #cbd5e1; }\n    .btn-secondary[_ngcontent-%COMP%]:hover { background: #f8fafc; }\n    .btn-danger[_ngcontent-%COMP%] { background: #dc2626; color: #fff; }\n    .btn-danger[_ngcontent-%COMP%]:hover { background: #b91c1c; }\n    .btn-outline-print[_ngcontent-%COMP%] { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; font-weight: 600; }\n    .btn-outline-print[_ngcontent-%COMP%]:hover { background: #dcfce7; }\n    .btn[_ngcontent-%COMP%]:disabled { opacity: 0.6; cursor: not-allowed; }\n\n    .btn-close[_ngcontent-%COMP%] { background: none; border: none; font-size: 1.25rem; cursor: pointer; color: #94a3b8; }\n\n    .alert[_ngcontent-%COMP%] { padding: 0.75rem 1rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }\n    .alert-error[_ngcontent-%COMP%] { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }\n    .alert-success[_ngcontent-%COMP%] { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }\n\n    .modal-backdrop[_ngcontent-%COMP%] { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.5); backdrop-filter: blur(2px); display: flex; justify-content: center; align-items: center; z-index: 1000; padding: 1rem; }\n    .modal-card[_ngcontent-%COMP%] { background: #fff; border-radius: 12px; width: 100%; max-width: 480px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15); overflow: hidden; animation: _ngcontent-%COMP%_pop 0.2s ease-out; }\n    .modal-header[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.25rem; border-bottom: 1px solid #f1f5f9; }\n    .modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 0; font-size: 1.15rem; color: #0f172a; }\n    .modal-body[_ngcontent-%COMP%] { padding: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.9rem; color: #334155; }\n    .modal-body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0; }\n    .modal-footer[_ngcontent-%COMP%] { display: flex; justify-content: flex-end; gap: 0.6rem; padding: 1rem 1.25rem; border-top: 1px solid #f1f5f9; background: #f8fafc; }\n\n    @keyframes _ngcontent-%COMP%_pop { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }\n    .empty-state[_ngcontent-%COMP%] { text-align: center; color: #94a3b8; padding: 3rem 1rem; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; }\n    .loading-state[_ngcontent-%COMP%] { text-align: center; padding: 3.5rem 1rem; color: #64748b; }\n    .spinner-large[_ngcontent-%COMP%] { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #0284c7; border-radius: 50%; animation: _ngcontent-%COMP%_spin 0.8s linear infinite; margin: 0 auto 0.75rem; }\n    @keyframes _ngcontent-%COMP%_spin { to { transform: rotate(360deg); } }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MembersPageComponent, [{
        type: Component,
        args: [{ selector: 'app-members-page', standalone: true, imports: [CommonModule, FormsModule, ReactiveFormsModule, DatePipe], template: `
    <div class="members-container">
      <header class="page-header">
        <div>
          <span class="badge-tag">Pastoral & Comunhão</span>
          <h1>Membros & Dizimistas</h1>
          <p class="subtitle">Cadastro pastoral, fidelidade ao dízimo e gestão de fiéis por comunidade.</p>
        </div>
        <div class="header-actions">
          <button type="button" class="btn btn-outline-print" (click)="generateStewardSheet()" title="Gerar folha de dízimo para impressão/PDF">
            📄 Gerar Folha de Dizimistas
          </button>
          <button type="button" class="btn btn-secondary" (click)="refresh()" [disabled]="memberService.loading()">
            Atualizar
          </button>
          <button type="button" class="btn btn-primary" (click)="toggleForm()">
            + Novo Membro
          </button>
        </div>
      </header>

      @if (memberService.error(); as err) {
        <div class="alert alert-error">
          <span>{{ err }}</span>
          <button class="btn-close" (click)="memberService.clearError()">&times;</button>
        </div>
      }
      @if (successMessage(); as msg) {
        <div class="alert alert-success">
          <span>{{ msg }}</span>
          <button class="btn-close" (click)="successMessage.set(null)">&times;</button>
        </div>
      }

      <!-- Formulário de Cadastro / Edição -->
      @if (showForm()) {
        <section class="card form-card">
          <div class="card-title-bar">
            <h3>{{ editingMemberId() ? 'Editar Membro: ' + memberForm.get('name')?.value : 'Cadastrar Novo Membro' }}</h3>
            <button class="btn-close" (click)="cancelForm()">&times;</button>
          </div>
          <form [formGroup]="memberForm" (ngSubmit)="submitMember()" class="member-form">
            <div class="form-row">
              <div class="field flex-2">
                <label for="name">Nome Completo *</label>
                <input id="name" type="text" formControlName="name" placeholder="Ex: Francisco de Assis Silva" />
              </div>
              <div class="field">
                <label for="communityId">Comunidade Pertencente *</label>
                <select id="communityId" formControlName="communityId">
                  <option value="" disabled>Selecione a comunidade...</option>
                  @for (comm of communityService.communities(); track comm.id) {
                    <option [value]="comm.id">
                      {{ comm.name }} {{ comm.isMainParish ? '(Matriz)' : '' }}
                    </option>
                  }
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="field">
                <label for="birthDate">Data de Nascimento</label>
                <input id="birthDate" type="date" formControlName="birthDate" />
              </div>
              <div class="field">
                <label for="phone">Telefone / WhatsApp</label>
                <input id="phone" type="text" formControlName="phone" placeholder="(11) 98765-4321" />
              </div>
              <div class="field">
                <label for="email">E-mail</label>
                <input id="email" type="email" formControlName="email" placeholder="membro@email.com" />
              </div>
            </div>

            <div class="form-row">
              <div class="field flex-2">
                <label for="ministry">Pastoral / Movimento / Ministério</label>
                <input id="ministry" type="text" formControlName="ministry" placeholder="Ex: Pastoral do Dízimo, Coral, Catequese, Liturgia" />
              </div>
              <div class="field">
                <label for="status">Situação Cadastral</label>
                <select id="status" formControlName="status">
                  <option value="ACTIVE">Ativo / Participante</option>
                  <option value="INACTIVE">Inativo</option>
                </select>
              </div>
              <div class="field field-checkbox">
                <label class="checkbox-label" for="isSteward">
                  <input id="isSteward" type="checkbox" formControlName="isSteward" />
                  <span>⭐ É Dizimista Ativo</span>
                </label>
              </div>
            </div>

            <div class="form-actions">
              <button type="button" class="btn btn-secondary" (click)="cancelForm()">Cancelar</button>
              <button type="submit" class="btn btn-primary" [disabled]="memberForm.invalid || memberService.loading()">
                {{ editingMemberId() ? 'Atualizar Membro' : 'Salvar Membro' }}
              </button>
            </div>
          </form>
        </section>
      }

      <!-- Modal de Inativação de Membro -->
      @if (inactivatingMember(); as target) {
        <div class="modal-backdrop" (click)="closeInactivateModal()">
          <div class="modal-card" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h3>Inativar Membro Pastoral</h3>
              <button class="btn-close" (click)="closeInactivateModal()">&times;</button>
            </div>
            <div class="modal-body">
              <p>Você está prestes a inativar o cadastro de <strong>{{ target.name }}</strong>.</p>
              <div class="field">
                <label for="inactiveReason">Motivo da Inativação *</label>
                <select id="inactiveReason" [(ngModel)]="selectedReason" (change)="onReasonSelectChange()">
                  <option value="Mudança de Paróquia">Mudança de Paróquia</option>
                  <option value="Pedido do Membro">Pedido do Membro</option>
                  <option value="Falecimento">Falecimento</option>
                  <option value="Afastamento Pastoral">Afastamento Pastoral</option>
                  <option value="Outro">Outro motivo especificado...</option>
                </select>
              </div>
              @if (selectedReason === 'Outro') {
                <div class="field" style="margin-top: 0.75rem;">
                  <label for="customReason">Descreva o motivo:</label>
                  <input id="customReason" type="text" [(ngModel)]="customReason" placeholder="Descreva brevemente o motivo..." />
                </div>
              }
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" (click)="closeInactivateModal()">Cancelar</button>
              <button type="button" class="btn btn-danger" (click)="confirmInactivation(target)" [disabled]="memberService.loading()">
                Confirmar Inativação
              </button>
            </div>
          </div>
        </div>
      }

      <!-- Faixa de Indicadores (KPIs) -->
      <section class="kpi-strip">
        <div class="kpi-card">
          <span class="label">Total de Membros</span>
          <strong class="value text-primary">{{ memberService.totalCount() }}</strong>
          <span class="hint">{{ memberService.activeCount() }} ativo(s) • {{ memberService.inactiveCount() }} inativo(s)</span>
        </div>
        <div class="kpi-card">
          <span class="label">Dizimistas Fiéis</span>
          <strong class="value text-success">{{ memberService.stewardsCount() }}</strong>
          <span class="hint">Contribuição regular (destacados no topo)</span>
        </div>
        <div class="kpi-card">
          <span class="label">Comunidade em Foco</span>
          <strong class="value text-focus">
            {{ communityService.activeCommunity()?.name || 'Visão Geral (Todas)' }}
          </strong>
          <span class="hint">{{ communityService.isAll() ? 'Consolidado da Paróquia' : 'Filtrado pela barra superior' }}</span>
        </div>
      </section>

      <!-- Tabela de Membros Ordenada (Dizimistas Primeiro) -->
      <section class="card table-card">
        @if (memberService.loading() && memberService.members().length === 0) {
          <div class="loading-state">
            <div class="spinner-large"></div>
            <p>Carregando membros da comunidade...</p>
          </div>
        } @else if (memberService.members().length === 0) {
          <div class="empty-state">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#94a3b8" stroke-width="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <p>Nenhum membro cadastrado nesta comunidade.</p>
            <button type="button" class="btn btn-primary" (click)="toggleForm()">Cadastrar Primeiro Membro</button>
          </div>
        } @else {
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Nome do Irmão(ã)</th>
                  <th>Comunidade</th>
                  <th>Status Dízimo</th>
                  <th>Pastoral / Serviço</th>
                  <th>Contato</th>
                  <th>Data Nasc.</th>
                  <th>Situação</th>
                  <th class="text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                @for (m of sortedMembers(); track m.id) {
                  <tr
                    [class.row-steward]="isActive(m) && (m.isSteward || (m.ministry && m.ministry.toLowerCase().includes('dízim')))"
                    [class.row-inactive]="!isActive(m)">
                    <td>
                      <div class="member-name">
                        <strong [class.text-muted]="!isActive(m)">{{ m.name }}</strong>
                        @if (!isActive(m) && m.inactiveReason) {
                          <span class="reason-tag">Motivo: {{ m.inactiveReason }}</span>
                        }
                      </div>
                    </td>
                    <td>
                      <span class="community-tag">{{ getCommunityName(m.communityId) }}</span>
                    </td>
                    <td>
                      @if (m.isSteward || (m.ministry && m.ministry.toLowerCase().includes('dízim'))) {
                        <span class="badge badge-steward">⭐ Dizimista</span>
                      } @else {
                        <span class="badge badge-default">Membro</span>
                      }
                    </td>
                    <td>{{ m.ministry || 'Comunidade' }}</td>
                    <td>
                      <div class="contact-info">
                        @if (m.phone) { <span>{{ m.phone }}</span> }
                        @if (m.email) { <small class="text-muted">{{ m.email }}</small> }
                        @if (!m.phone && !m.email) { <span class="text-muted">-</span> }
                      </div>
                    </td>
                    <td class="col-date">{{ m.birthDate ? (m.birthDate | date:'dd/MM/yyyy') : '-' }}</td>
                    <td>
                      @if (isActive(m)) {
                        <span class="badge badge-active">● Ativo</span>
                      } @else {
                        <span class="badge badge-inactive" [title]="m.inactiveReason ? 'Motivo: ' + m.inactiveReason : 'Inativo'">● Inativo</span>
                      }
                    </td>
                    <td class="text-right">
                      <div class="actions-cell">
                        <button
                          type="button"
                          class="btn-action btn-action-edit"
                          (click)="startEdit(m)"
                          title="Editar dados do membro"
                        >
                          ✏️ Editar
                        </button>

                        @if (isActive(m)) {
                          <button
                            type="button"
                            class="btn-action btn-action-inactivate"
                            (click)="openInactivateModal(m)"
                            title="Inativar membro"
                          >
                            Inativar
                          </button>
                        } @else {
                          <button
                            type="button"
                            class="btn-action btn-action-reactivate"
                            (click)="reactivateMember(m)"
                            title="Reativar membro"
                          >
                            Reativar
                          </button>
                        }
                      </div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </section>
    </div>
  `, styles: ["\n    .members-container { display: flex; flex-direction: column; gap: 1.5rem; }\n    .page-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }\n    .page-header h1 { font-size: 1.75rem; color: #0f172a; margin: 0.2rem 0; font-weight: 700; }\n    .subtitle { color: #64748b; font-size: 0.9rem; margin: 0; }\n    .badge-tag { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; background: #e0f2fe; color: #0369a1; padding: 0.2rem 0.6rem; border-radius: 9999px; }\n    .header-actions { display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; }\n\n    .card { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }\n    .card-title-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }\n    .card-title-bar h3 { margin: 0; font-size: 1.15rem; color: #0f172a; font-weight: 600; }\n\n    .member-form { display: flex; flex-direction: column; gap: 1rem; }\n    .form-row { display: flex; flex-wrap: wrap; gap: 1rem; }\n    .field { display: flex; flex-direction: column; gap: 0.35rem; flex: 1; min-width: 160px; }\n    .flex-2 { flex: 2; }\n    .field label { font-size: 0.8rem; font-weight: 600; color: #475569; }\n    .field input, .field select { padding: 0.55rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem; outline: none; }\n    .field input:focus, .field select:focus { border-color: #0284c7; box-shadow: 0 0 0 2px rgba(2, 132, 199, 0.15); }\n    .field-checkbox { justify-content: flex-end; padding-bottom: 0.3rem; }\n    .checkbox-label { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; font-size: 0.875rem; font-weight: 600; color: #0f172a; }\n    .checkbox-label input { width: 1.1rem; height: 1.1rem; cursor: pointer; }\n    .form-actions { display: flex; justify-content: flex-end; gap: 0.6rem; margin-top: 0.5rem; }\n\n    .kpi-strip { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }\n    .kpi-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1.2rem; display: flex; flex-direction: column; gap: 0.25rem; box-shadow: 0 1px 2px rgba(0,0,0,0.03); }\n    .kpi-card .label { font-size: 0.8rem; font-weight: 600; color: #64748b; text-transform: uppercase; }\n    .kpi-card .value { font-size: 1.6rem; font-weight: 700; }\n    .kpi-card .hint { font-size: 0.75rem; color: #94a3b8; }\n    .text-primary { color: #0284c7; }\n    .text-success { color: #16a34a; }\n    .text-focus { color: #0f172a; font-size: 1.25rem !important; }\n\n    .table-card { padding: 0; overflow: hidden; }\n    .table-responsive { overflow-x: auto; }\n    .data-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem; }\n    .data-table th { background: #f8fafc; color: #475569; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; padding: 0.75rem 1rem; border-bottom: 1px solid #e2e8f0; }\n    .data-table td { padding: 0.85rem 1rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }\n    .row-steward { background-color: #fafffd; }\n    .row-inactive { background-color: #fcfcfd; opacity: 0.8; }\n    .col-date { white-space: nowrap; color: #64748b; font-size: 0.8rem; }\n    .member-name { display: flex; flex-direction: column; gap: 0.2rem; }\n    .member-name strong { color: #0f172a; font-size: 0.9rem; }\n    .reason-tag { font-size: 0.72rem; color: #b91c1c; font-style: italic; }\n    .community-tag { font-size: 0.75rem; font-weight: 600; color: #0369a1; background: #f0f9ff; padding: 0.2rem 0.5rem; border-radius: 4px; border: 1px solid #e0f2fe; }\n\n    .contact-info { display: flex; flex-direction: column; line-height: 1.2; }\n\n    .badge { font-size: 0.75rem; font-weight: 600; padding: 0.2rem 0.55rem; border-radius: 9999px; display: inline-flex; align-items: center; gap: 0.2rem; }\n    .badge-steward { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; font-weight: 700; }\n    .badge-default { background: #f1f5f9; color: #475569; }\n    .badge-active { background: #ecfdf5; color: #047857; font-weight: 600; border: 1px solid #a7f3d0; }\n    .badge-inactive { background: #fee2e2; color: #b91c1c; font-weight: 600; border: 1px solid #fecaca; }\n\n    .text-muted { color: #94a3b8; }\n    .text-right { text-align: right; }\n\n    .actions-cell { display: inline-flex; gap: 0.5rem; justify-content: flex-end; align-items: center; }\n    .btn-action { background: none; border: none; cursor: pointer; font-size: 0.8rem; font-weight: 600; padding: 0.25rem 0.5rem; border-radius: 4px; transition: background 0.15s ease; }\n    .btn-action-edit { color: #0284c7; background: #f0f9ff; border: 1px solid #bae6fd; }\n    .btn-action-edit:hover { background: #e0f2fe; }\n    .btn-action-inactivate { color: #dc2626; background: #fef2f2; border: 1px solid #fecaca; }\n    .btn-action-inactivate:hover { background: #fee2e2; }\n    .btn-action-reactivate { color: #059669; background: #ecfdf5; border: 1px solid #a7f3d0; }\n    .btn-action-reactivate:hover { background: #d1fae5; }\n\n    .btn { padding: 0.6rem 1rem; border-radius: 8px; font-weight: 500; font-size: 0.875rem; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 0.4rem; transition: background 0.15s ease; }\n    .btn-primary { background: #0284c7; color: #fff; }\n    .btn-primary:hover { background: #0369a1; }\n    .btn-secondary { background: #fff; color: #334155; border: 1px solid #cbd5e1; }\n    .btn-secondary:hover { background: #f8fafc; }\n    .btn-danger { background: #dc2626; color: #fff; }\n    .btn-danger:hover { background: #b91c1c; }\n    .btn-outline-print { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; font-weight: 600; }\n    .btn-outline-print:hover { background: #dcfce7; }\n    .btn:disabled { opacity: 0.6; cursor: not-allowed; }\n\n    .btn-close { background: none; border: none; font-size: 1.25rem; cursor: pointer; color: #94a3b8; }\n\n    .alert { padding: 0.75rem 1rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }\n    .alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }\n    .alert-success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }\n\n    .modal-backdrop { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.5); backdrop-filter: blur(2px); display: flex; justify-content: center; align-items: center; z-index: 1000; padding: 1rem; }\n    .modal-card { background: #fff; border-radius: 12px; width: 100%; max-width: 480px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15); overflow: hidden; animation: pop 0.2s ease-out; }\n    .modal-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.25rem; border-bottom: 1px solid #f1f5f9; }\n    .modal-header h3 { margin: 0; font-size: 1.15rem; color: #0f172a; }\n    .modal-body { padding: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.9rem; color: #334155; }\n    .modal-body p { margin: 0; }\n    .modal-footer { display: flex; justify-content: flex-end; gap: 0.6rem; padding: 1rem 1.25rem; border-top: 1px solid #f1f5f9; background: #f8fafc; }\n\n    @keyframes pop { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }\n    .empty-state { text-align: center; color: #94a3b8; padding: 3rem 1rem; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; }\n    .loading-state { text-align: center; padding: 3.5rem 1rem; color: #64748b; }\n    .spinner-large { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #0284c7; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 0.75rem; }\n    @keyframes spin { to { transform: rotate(360deg); } }\n  "] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(MembersPageComponent, { className: "MembersPageComponent", filePath: "src\\app\\pages\\members-page.component.ts", lineNumber: 386 }); })();
//# sourceMappingURL=members-page.component.js.map