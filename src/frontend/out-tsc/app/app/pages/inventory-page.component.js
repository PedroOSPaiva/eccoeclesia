import { Component, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryService } from '../core/services/inventory.service';
import { DomBosquinhoStateComponent } from '../shared/components/dom-bosquinho-state.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
function InventoryPageComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 14);
    i0.ɵɵtext(1, " Sincronizando... ");
} }
function InventoryPageComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Sincronizar ");
} }
function InventoryPageComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-dom-bosquinho-state", 15);
    i0.ɵɵlistener("retry", function InventoryPageComponent_Conditional_15_Template_app_dom_bosquinho_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.refresh()); })("dismiss", function InventoryPageComponent_Conditional_15_Template_app_dom_bosquinho_state_dismiss_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.inventoryService.clearError()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵproperty("message", ctx)("showDismiss", true);
} }
function InventoryPageComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 16);
    i0.ɵɵlistener("click", function InventoryPageComponent_Conditional_16_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.successMessage.set(null)); });
    i0.ɵɵtext(4, "\u00D7");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx);
} }
function InventoryPageComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9)(1, "strong");
    i0.ɵɵtext(2, "Aten\u00E7\u00E3o ao Almoxarifado:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" Existem ", ctx_r1.inventoryService.lowStockCount(), " item(ns) abaixo da quantidade m\u00EDnima recomendada. ");
} }
function InventoryPageComponent_Conditional_18_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20)(1, "label", 37);
    i0.ɵɵtext(2, "Garantia (Meses)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "input", 38);
    i0.ɵɵelementEnd();
} }
function InventoryPageComponent_Conditional_18_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20)(1, "label", 39);
    i0.ɵɵtext(2, "Data de Validade");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "input", 40);
    i0.ɵɵelementEnd();
} }
function InventoryPageComponent_Conditional_18_Conditional_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 14);
    i0.ɵɵtext(1, " Salvando... ");
} }
function InventoryPageComponent_Conditional_18_Conditional_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Salvar Item ");
} }
function InventoryPageComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 10)(1, "div", 17)(2, "h3");
    i0.ɵɵtext(3, "Cadastrar Item no Invent\u00E1rio");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 16);
    i0.ɵɵlistener("click", function InventoryPageComponent_Conditional_18_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleForm()); });
    i0.ɵɵtext(5, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "form", 18);
    i0.ɵɵlistener("ngSubmit", function InventoryPageComponent_Conditional_18_Template_form_ngSubmit_6_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitItem()); });
    i0.ɵɵelementStart(7, "div", 19)(8, "div", 20)(9, "label", 21);
    i0.ɵɵtext(10, "Tipo de Bem");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "select", 22);
    i0.ɵɵlistener("change", function InventoryPageComponent_Conditional_18_Template_select_change_11_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onTypeChange()); });
    i0.ɵɵelementStart(12, "option", 23);
    i0.ɵɵtext(13, "Bem Dur\u00E1vel (Patrim\u00F4nio / Equipamento)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "option", 24);
    i0.ɵɵtext(15, "Consum\u00EDvel (Almoxarifado / Vela / \u00D3stia)");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(16, "div", 25)(17, "label", 26);
    i0.ɵɵtext(18, "Nome do Item");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(19, "input", 27);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 19)(21, "div", 25)(22, "label", 28);
    i0.ɵɵtext(23, "Descri\u00E7\u00E3o Detalhada");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(24, "input", 29);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "div", 20)(26, "label", 30);
    i0.ɵɵtext(27, "Quantidade em Estoque");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(28, "input", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "div", 20)(30, "label", 32);
    i0.ɵɵtext(31, "Estoque M\u00EDnimo");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(32, "input", 33);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "div", 19);
    i0.ɵɵtemplate(34, InventoryPageComponent_Conditional_18_Conditional_34_Template, 4, 0, "div", 20)(35, InventoryPageComponent_Conditional_18_Conditional_35_Template, 4, 0, "div", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "div", 34)(37, "button", 35);
    i0.ɵɵlistener("click", function InventoryPageComponent_Conditional_18_Template_button_click_37_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleForm()); });
    i0.ɵɵtext(38, "Cancelar");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "button", 36);
    i0.ɵɵtemplate(40, InventoryPageComponent_Conditional_18_Conditional_40_Template, 2, 0)(41, InventoryPageComponent_Conditional_18_Conditional_41_Template, 1, 0);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("formGroup", ctx_r1.itemForm);
    i0.ɵɵadvance(28);
    i0.ɵɵconditional(ctx_r1.isDurable() ? 34 : 35);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", ctx_r1.itemForm.invalid || ctx_r1.inventoryService.loading());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.inventoryService.loading() ? 40 : 41);
} }
function InventoryPageComponent_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵelement(1, "div", 41);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Carregando invent\u00E1rio...");
    i0.ɵɵelementEnd()();
} }
function InventoryPageComponent_Conditional_21_For_20_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 45);
    i0.ɵɵtext(1, "Dur\u00E1vel");
    i0.ɵɵelementEnd();
} }
function InventoryPageComponent_Conditional_21_For_20_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 46);
    i0.ɵɵtext(1, "Consum\u00EDvel");
    i0.ɵɵelementEnd();
} }
function InventoryPageComponent_Conditional_21_For_20_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 49);
    i0.ɵɵtext(1, "Estoque Baixo");
    i0.ɵɵelementEnd();
} }
function InventoryPageComponent_Conditional_21_For_20_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 50);
    i0.ɵɵtext(1, "Normal");
    i0.ɵɵelementEnd();
} }
function InventoryPageComponent_Conditional_21_For_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td");
    i0.ɵɵtemplate(5, InventoryPageComponent_Conditional_21_For_20_Conditional_5_Template, 2, 0, "span", 45)(6, InventoryPageComponent_Conditional_21_For_20_Conditional_6_Template, 2, 0, "span", 46);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 47);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td", 48);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td");
    i0.ɵɵtemplate(14, InventoryPageComponent_Conditional_21_For_20_Conditional_14_Template, 2, 0, "span", 49)(15, InventoryPageComponent_Conditional_21_For_20_Conditional_15_Template, 2, 0, "span", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td", 51);
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "date");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    i0.ɵɵclassProp("row-alert", item_r5.quantity <= item_r5.minimumQuantity);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r5.name);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(item_r5.type === "DURABLE" ? 5 : 6);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r5.description);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r5.quantity);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r5.minimumQuantity);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(item_r5.quantity <= item_r5.minimumQuantity ? 14 : 15);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(18, 9, item_r5.lastUpdated, "dd/MM/yyyy HH:mm"));
} }
function InventoryPageComponent_Conditional_21_ForEmpty_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 52)(2, "p");
    i0.ɵɵtext(3, "Nenhum item cadastrado no invent\u00E1rio paroquial.");
    i0.ɵɵelementEnd()()();
} }
function InventoryPageComponent_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13)(1, "table", 42)(2, "thead")(3, "tr")(4, "th");
    i0.ɵɵtext(5, "Item / Patrim\u00F4nio");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "th");
    i0.ɵɵtext(7, "Tipo");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th");
    i0.ɵɵtext(9, "Localiza\u00E7\u00E3o / Descri\u00E7\u00E3o");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 43);
    i0.ɵɵtext(11, "Quantidade");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th", 43);
    i0.ɵɵtext(13, "M\u00EDnimo");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "th");
    i0.ɵɵtext(15, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th");
    i0.ɵɵtext(17, "\u00DAltima Atualiza\u00E7\u00E3o");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(18, "tbody");
    i0.ɵɵrepeaterCreate(19, InventoryPageComponent_Conditional_21_For_20_Template, 19, 12, "tr", 44, _forTrack0, false, InventoryPageComponent_Conditional_21_ForEmpty_21_Template, 4, 0, "tr");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(19);
    i0.ɵɵrepeater(ctx_r1.inventoryService.items());
} }
export class InventoryPageComponent {
    inventoryService = inject(InventoryService);
    fb = inject(FormBuilder);
    showForm = signal(false);
    successMessage = signal(null);
    itemForm = this.fb.group({
        type: ['DURABLE', Validators.required],
        name: ['', [Validators.required, Validators.minLength(2)]],
        description: ['', Validators.required],
        quantity: [1, [Validators.required, Validators.min(0)]],
        minimumQuantity: [1, [Validators.required, Validators.min(0)]],
        warrantyMonths: [12],
        expirationDate: [''],
    });
    isDurable() {
        return this.itemForm.get('type')?.value === 'DURABLE';
    }
    ngOnInit() {
        this.refresh();
    }
    refresh() {
        this.inventoryService.loadItems().subscribe();
        this.inventoryService.loadAlerts().subscribe();
    }
    toggleForm() {
        this.showForm.update((v) => !v);
    }
    onTypeChange() {
        // Reavalia estado dos campos
    }
    submitItem() {
        if (this.itemForm.invalid) {
            this.itemForm.markAllAsTouched();
            return;
        }
        const val = this.itemForm.getRawValue();
        if (val.type === 'DURABLE') {
            const dto = {
                name: val.name,
                description: val.description,
                quantity: Number(val.quantity),
                minimumQuantity: Number(val.minimumQuantity),
                warrantyMonths: Number(val.warrantyMonths || 0),
            };
            this.inventoryService.createDurable(dto).subscribe({
                next: () => {
                    this.successMessage.set('Bem durável cadastrado com sucesso!');
                    this.itemForm.reset({ type: 'DURABLE', quantity: 1, minimumQuantity: 1, warrantyMonths: 12 });
                    this.showForm.set(false);
                },
            });
        }
        else {
            const dto = {
                name: val.name,
                description: val.description,
                quantity: Number(val.quantity),
                minimumQuantity: Number(val.minimumQuantity),
                expirationDate: val.expirationDate || new Date().toISOString().substring(0, 10),
            };
            this.inventoryService.createConsumable(dto).subscribe({
                next: () => {
                    this.successMessage.set('Item de consumo cadastrado com sucesso!');
                    this.itemForm.reset({ type: 'CONSUMABLE', quantity: 1, minimumQuantity: 1 });
                    this.showForm.set(false);
                },
            });
        }
    }
    static ɵfac = function InventoryPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || InventoryPageComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: InventoryPageComponent, selectors: [["app-inventory-page"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 22, vars: 7, consts: [[1, "inventory-container"], [1, "page-header"], [1, "badge-tag"], [1, "subtitle"], [1, "header-actions"], ["type", "button", 1, "btn", "btn-secondary", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], ["mode", "error", "title", "Ops! Dom Bosquinho avisa que houve um contratempo", 3, "message", "showDismiss"], [1, "alert", "alert-success"], [1, "alert", "alert-warning"], [1, "card", "form-card"], [1, "card", "table-card"], [1, "loading-state"], [1, "table-responsive"], [1, "spinner"], ["mode", "error", "title", "Ops! Dom Bosquinho avisa que houve um contratempo", 3, "retry", "dismiss", "message", "showDismiss"], [1, "btn-close", 3, "click"], [1, "card-title-bar"], [1, "item-form", 3, "ngSubmit", "formGroup"], [1, "form-row"], [1, "field"], ["for", "itemType"], ["id", "itemType", "formControlName", "type", 3, "change"], ["value", "DURABLE"], ["value", "CONSUMABLE"], [1, "field", "flex-2"], ["for", "name"], ["id", "name", "type", "text", "formControlName", "name", "placeholder", "Ex: Microfone sem fio, C\u00E1lice Lit\u00FArgico"], ["for", "desc"], ["id", "desc", "type", "text", "formControlName", "description", "placeholder", "Marca, modelo, localiza\u00E7\u00E3o na par\u00F3quia"], ["for", "qty"], ["id", "qty", "type", "number", "formControlName", "quantity"], ["for", "minQty"], ["id", "minQty", "type", "number", "formControlName", "minimumQuantity"], [1, "form-actions"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["for", "warranty"], ["id", "warranty", "type", "number", "formControlName", "warrantyMonths", "placeholder", "12"], ["for", "expiration"], ["id", "expiration", "type", "date", "formControlName", "expirationDate"], [1, "spinner-large"], [1, "data-table"], [1, "text-center"], [3, "row-alert"], [1, "badge", "badge-durable"], [1, "badge", "badge-consumable"], [1, "text-center", "font-bold"], [1, "text-center", "text-muted"], [1, "status-warning"], [1, "status-ok"], [1, "col-date"], ["colspan", "7", 1, "empty-state"]], template: function InventoryPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "span", 2);
            i0.ɵɵtext(4, "Gest\u00E3o de Patrim\u00F4nio & Almoxarifado");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1");
            i0.ɵɵtext(6, "Invent\u00E1rio Comunit\u00E1rio");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 3);
            i0.ɵɵtext(8, "Controle de bens dur\u00E1veis (patrim\u00F4nio) e itens de consumo paroquial.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 4)(10, "button", 5);
            i0.ɵɵlistener("click", function InventoryPageComponent_Template_button_click_10_listener() { return ctx.refresh(); });
            i0.ɵɵtemplate(11, InventoryPageComponent_Conditional_11_Template, 2, 0)(12, InventoryPageComponent_Conditional_12_Template, 1, 0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "button", 6);
            i0.ɵɵlistener("click", function InventoryPageComponent_Template_button_click_13_listener() { return ctx.toggleForm(); });
            i0.ɵɵtext(14, " + Novo Item ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(15, InventoryPageComponent_Conditional_15_Template, 1, 2, "app-dom-bosquinho-state", 7)(16, InventoryPageComponent_Conditional_16_Template, 5, 1, "div", 8)(17, InventoryPageComponent_Conditional_17_Template, 4, 1, "div", 9)(18, InventoryPageComponent_Conditional_18_Template, 42, 4, "section", 10);
            i0.ɵɵelementStart(19, "section", 11);
            i0.ɵɵtemplate(20, InventoryPageComponent_Conditional_20_Template, 4, 0, "div", 12)(21, InventoryPageComponent_Conditional_21_Template, 22, 1, "div", 13);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            let tmp_2_0;
            let tmp_3_0;
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("disabled", ctx.inventoryService.loading());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.inventoryService.loading() ? 11 : 12);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional((tmp_2_0 = ctx.inventoryService.error()) ? 15 : -1, tmp_2_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_3_0 = ctx.successMessage()) ? 16 : -1, tmp_3_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.inventoryService.lowStockCount() > 0 ? 17 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showForm() ? 18 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.inventoryService.loading() && ctx.inventoryService.items().length === 0 ? 20 : 21);
        } }, dependencies: [CommonModule, i1.DatePipe, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, DomBosquinhoStateComponent], styles: [".inventory-container[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 1.25rem; }\n    .page-header[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }\n    .page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { margin: 0.2rem 0 0; color: #0f172a; font-size: 1.75rem; }\n    .badge-tag[_ngcontent-%COMP%] { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #7c3aed; background: #f5f3ff; padding: 0.2rem 0.5rem; border-radius: 4px; }\n    .subtitle[_ngcontent-%COMP%] { color: #64748b; font-size: 0.875rem; margin: 0.25rem 0 0; }\n    .header-actions[_ngcontent-%COMP%] { display: flex; gap: 0.6rem; align-items: center; }\n    .card[_ngcontent-%COMP%] { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 1.25rem; }\n    .form-card[_ngcontent-%COMP%] { box-shadow: 0 4px 12px rgba(0,0,0,0.06); }\n    .card-title-bar[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.6rem; margin-bottom: 1rem; }\n    .card-title-bar[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 0; font-size: 1.1rem; color: #0f172a; }\n    .item-form[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 1rem; }\n    .form-row[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: 1rem; }\n    .field[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 0.35rem; flex: 1; min-width: 140px; }\n    .flex-2[_ngcontent-%COMP%] { flex: 2; }\n    .field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] { font-size: 0.8rem; font-weight: 600; color: #475569; }\n    .field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] { padding: 0.55rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem; }\n    .form-actions[_ngcontent-%COMP%] { display: flex; justify-content: flex-end; gap: 0.6rem; }\n    .table-card[_ngcontent-%COMP%] { padding: 0; overflow: hidden; }\n    .table-responsive[_ngcontent-%COMP%] { overflow-x: auto; }\n    .data-table[_ngcontent-%COMP%] { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem; }\n    .data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] { background: #f8fafc; color: #475569; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; padding: 0.75rem 1rem; border-bottom: 1px solid #e2e8f0; }\n    .data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] { padding: 0.8rem 1rem; border-bottom: 1px solid #f1f5f9; }\n    .row-alert[_ngcontent-%COMP%] { background: #fffbeb; }\n    .col-date[_ngcontent-%COMP%] { white-space: nowrap; color: #64748b; font-size: 0.8rem; }\n    .badge[_ngcontent-%COMP%] { font-size: 0.75rem; font-weight: 600; padding: 0.15rem 0.5rem; border-radius: 9999px; }\n    .badge-durable[_ngcontent-%COMP%] { background: #e0e7ff; color: #4338ca; }\n    .badge-consumable[_ngcontent-%COMP%] { background: #fef3c7; color: #b45309; }\n    .status-ok[_ngcontent-%COMP%] { color: #059669; font-weight: 600; font-size: 0.8rem; }\n    .status-warning[_ngcontent-%COMP%] { color: #d97706; font-weight: 700; font-size: 0.8rem; }\n    .font-bold[_ngcontent-%COMP%] { font-weight: 700; }\n    .text-center[_ngcontent-%COMP%] { text-align: center; }\n    .text-muted[_ngcontent-%COMP%] { color: #94a3b8; }\n    .btn[_ngcontent-%COMP%] { padding: 0.6rem 1rem; border-radius: 8px; font-weight: 500; font-size: 0.875rem; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 0.4rem; }\n    .btn-primary[_ngcontent-%COMP%] { background: #7c3aed; color: #fff; }\n    .btn-secondary[_ngcontent-%COMP%] { background: #fff; color: #334155; border: 1px solid #cbd5e1; }\n    .btn-close[_ngcontent-%COMP%] { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #94a3b8; }\n    .alert[_ngcontent-%COMP%] { padding: 0.75rem 1rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }\n    .alert-error[_ngcontent-%COMP%] { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }\n    .alert-success[_ngcontent-%COMP%] { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }\n    .alert-warning[_ngcontent-%COMP%] { background: #fffbeb; border: 1px solid #fef3c7; color: #92400e; padding: 0.75rem 1rem; border-radius: 8px; font-size: 0.875rem; }\n    .empty-state[_ngcontent-%COMP%] { text-align: center; color: #94a3b8; padding: 2.5rem 1rem; }\n    .loading-state[_ngcontent-%COMP%] { text-align: center; padding: 3rem 1rem; color: #64748b; }\n    .spinner-large[_ngcontent-%COMP%] { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #7c3aed; border-radius: 50%; animation: _ngcontent-%COMP%_spin 0.8s linear infinite; margin: 0 auto 0.75rem; }\n    @keyframes _ngcontent-%COMP%_spin { to { transform: rotate(360deg); } }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(InventoryPageComponent, [{
        type: Component,
        args: [{ selector: 'app-inventory-page', standalone: true, imports: [CommonModule, ReactiveFormsModule, DatePipe, DomBosquinhoStateComponent], template: `
    <div class="inventory-container">
      <header class="page-header">
        <div>
          <span class="badge-tag">Gestão de Patrimônio & Almoxarifado</span>
          <h1>Inventário Comunitário</h1>
          <p class="subtitle">Controle de bens duráveis (patrimônio) e itens de consumo paroquial.</p>
        </div>
        <div class="header-actions">
          <button type="button" class="btn btn-secondary" (click)="refresh()" [disabled]="inventoryService.loading()">
            @if (inventoryService.loading()) {
              <span class="spinner"></span> Sincronizando...
            } @else {
              Sincronizar
            }
          </button>
          <button type="button" class="btn btn-primary" (click)="toggleForm()">
            + Novo Item
          </button>
        </div>
      </header>

      <!-- Feedback de Erro com Dom Bosquinho -->
      @if (inventoryService.error(); as err) {
        <app-dom-bosquinho-state
          mode="error"
          title="Ops! Dom Bosquinho avisa que houve um contratempo"
          [message]="err"
          [showDismiss]="true"
          (retry)="refresh()"
          (dismiss)="inventoryService.clearError()">
        </app-dom-bosquinho-state>
      }
      @if (successMessage(); as msg) {
        <div class="alert alert-success">
          <span>{{ msg }}</span>
          <button class="btn-close" (click)="successMessage.set(null)">&times;</button>
        </div>
      }

      <!-- Alertas de Estoque Mínimo -->
      @if (inventoryService.lowStockCount() > 0) {
        <div class="alert alert-warning">
          <strong>Atenção ao Almoxarifado:</strong> Existem {{ inventoryService.lowStockCount() }} item(ns) abaixo da quantidade mínima recomendada.
        </div>
      }

      <!-- Formulário de Cadastro -->
      @if (showForm()) {
        <section class="card form-card">
          <div class="card-title-bar">
            <h3>Cadastrar Item no Inventário</h3>
            <button class="btn-close" (click)="toggleForm()">&times;</button>
          </div>
          <form [formGroup]="itemForm" (ngSubmit)="submitItem()" class="item-form">
            <div class="form-row">
              <div class="field">
                <label for="itemType">Tipo de Bem</label>
                <select id="itemType" formControlName="type" (change)="onTypeChange()">
                  <option value="DURABLE">Bem Durável (Patrimônio / Equipamento)</option>
                  <option value="CONSUMABLE">Consumível (Almoxarifado / Vela / Óstia)</option>
                </select>
              </div>
              <div class="field flex-2">
                <label for="name">Nome do Item</label>
                <input id="name" type="text" formControlName="name" placeholder="Ex: Microfone sem fio, Cálice Litúrgico" />
              </div>
            </div>

            <div class="form-row">
              <div class="field flex-2">
                <label for="desc">Descrição Detalhada</label>
                <input id="desc" type="text" formControlName="description" placeholder="Marca, modelo, localização na paróquia" />
              </div>
              <div class="field">
                <label for="qty">Quantidade em Estoque</label>
                <input id="qty" type="number" formControlName="quantity" />
              </div>
              <div class="field">
                <label for="minQty">Estoque Mínimo</label>
                <input id="minQty" type="number" formControlName="minimumQuantity" />
              </div>
            </div>

            <div class="form-row">
              @if (isDurable()) {
                <div class="field">
                  <label for="warranty">Garantia (Meses)</label>
                  <input id="warranty" type="number" formControlName="warrantyMonths" placeholder="12" />
                </div>
              } @else {
                <div class="field">
                  <label for="expiration">Data de Validade</label>
                  <input id="expiration" type="date" formControlName="expirationDate" />
                </div>
              }
            </div>

            <div class="form-actions">
              <button type="button" class="btn btn-secondary" (click)="toggleForm()">Cancelar</button>
              <button type="submit" class="btn btn-primary" [disabled]="itemForm.invalid || inventoryService.loading()">
                @if (inventoryService.loading()) {
                  <span class="spinner"></span> Salvando...
                } @else {
                  Salvar Item
                }
              </button>
            </div>
          </form>
        </section>
      }

      <!-- Tabela de Inventário -->
      <section class="card table-card">
        @if (inventoryService.loading() && inventoryService.items().length === 0) {
          <div class="loading-state">
            <div class="spinner-large"></div>
            <p>Carregando inventário...</p>
          </div>
        } @else {
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Item / Patrimônio</th>
                  <th>Tipo</th>
                  <th>Localização / Descrição</th>
                  <th class="text-center">Quantidade</th>
                  <th class="text-center">Mínimo</th>
                  <th>Status</th>
                  <th>Última Atualização</th>
                </tr>
              </thead>
              <tbody>
                @for (item of inventoryService.items(); track item.id) {
                  <tr [class.row-alert]="item.quantity <= item.minimumQuantity">
                    <td><strong>{{ item.name }}</strong></td>
                    <td>
                      @if (item.type === 'DURABLE') {
                        <span class="badge badge-durable">Durável</span>
                      } @else {
                        <span class="badge badge-consumable">Consumível</span>
                      }
                    </td>
                    <td>{{ item.description }}</td>
                    <td class="text-center font-bold">{{ item.quantity }}</td>
                    <td class="text-center text-muted">{{ item.minimumQuantity }}</td>
                    <td>
                      @if (item.quantity <= item.minimumQuantity) {
                        <span class="status-warning">Estoque Baixo</span>
                      } @else {
                        <span class="status-ok">Normal</span>
                      }
                    </td>
                    <td class="col-date">{{ item.lastUpdated | date:'dd/MM/yyyy HH:mm' }}</td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="7" class="empty-state">
                      <p>Nenhum item cadastrado no inventário paroquial.</p>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </section>
    </div>
  `, styles: ["\n    .inventory-container { display: flex; flex-direction: column; gap: 1.25rem; }\n    .page-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }\n    .page-header h1 { margin: 0.2rem 0 0; color: #0f172a; font-size: 1.75rem; }\n    .badge-tag { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #7c3aed; background: #f5f3ff; padding: 0.2rem 0.5rem; border-radius: 4px; }\n    .subtitle { color: #64748b; font-size: 0.875rem; margin: 0.25rem 0 0; }\n    .header-actions { display: flex; gap: 0.6rem; align-items: center; }\n    .card { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 1.25rem; }\n    .form-card { box-shadow: 0 4px 12px rgba(0,0,0,0.06); }\n    .card-title-bar { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.6rem; margin-bottom: 1rem; }\n    .card-title-bar h3 { margin: 0; font-size: 1.1rem; color: #0f172a; }\n    .item-form { display: flex; flex-direction: column; gap: 1rem; }\n    .form-row { display: flex; flex-wrap: wrap; gap: 1rem; }\n    .field { display: flex; flex-direction: column; gap: 0.35rem; flex: 1; min-width: 140px; }\n    .flex-2 { flex: 2; }\n    .field label { font-size: 0.8rem; font-weight: 600; color: #475569; }\n    .field input, .field select { padding: 0.55rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem; }\n    .form-actions { display: flex; justify-content: flex-end; gap: 0.6rem; }\n    .table-card { padding: 0; overflow: hidden; }\n    .table-responsive { overflow-x: auto; }\n    .data-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem; }\n    .data-table th { background: #f8fafc; color: #475569; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; padding: 0.75rem 1rem; border-bottom: 1px solid #e2e8f0; }\n    .data-table td { padding: 0.8rem 1rem; border-bottom: 1px solid #f1f5f9; }\n    .row-alert { background: #fffbeb; }\n    .col-date { white-space: nowrap; color: #64748b; font-size: 0.8rem; }\n    .badge { font-size: 0.75rem; font-weight: 600; padding: 0.15rem 0.5rem; border-radius: 9999px; }\n    .badge-durable { background: #e0e7ff; color: #4338ca; }\n    .badge-consumable { background: #fef3c7; color: #b45309; }\n    .status-ok { color: #059669; font-weight: 600; font-size: 0.8rem; }\n    .status-warning { color: #d97706; font-weight: 700; font-size: 0.8rem; }\n    .font-bold { font-weight: 700; }\n    .text-center { text-align: center; }\n    .text-muted { color: #94a3b8; }\n    .btn { padding: 0.6rem 1rem; border-radius: 8px; font-weight: 500; font-size: 0.875rem; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 0.4rem; }\n    .btn-primary { background: #7c3aed; color: #fff; }\n    .btn-secondary { background: #fff; color: #334155; border: 1px solid #cbd5e1; }\n    .btn-close { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #94a3b8; }\n    .alert { padding: 0.75rem 1rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }\n    .alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }\n    .alert-success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }\n    .alert-warning { background: #fffbeb; border: 1px solid #fef3c7; color: #92400e; padding: 0.75rem 1rem; border-radius: 8px; font-size: 0.875rem; }\n    .empty-state { text-align: center; color: #94a3b8; padding: 2.5rem 1rem; }\n    .loading-state { text-align: center; padding: 3rem 1rem; color: #64748b; }\n    .spinner-large { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #7c3aed; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 0.75rem; }\n    @keyframes spin { to { transform: rotate(360deg); } }\n  "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(InventoryPageComponent, { className: "InventoryPageComponent", filePath: "src\\app\\pages\\inventory-page.component.ts", lineNumber: 229 }); })();
//# sourceMappingURL=inventory-page.component.js.map