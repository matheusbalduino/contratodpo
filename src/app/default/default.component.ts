import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { DisplayMessage, GenericValidator, ValidationMessages } from '../Utils/generic-form-validation';
import {fromEvent, merge, Observable}from 'rxjs';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { Usuario } from '../Interface/Usuario';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements:ElementRef[];

  public MASKS = MASKS;

  cadastroForm: FormGroup;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage:DisplayMessage = {};

  UsuarioEnvio: Usuario = new Usuario();

  mudancasNaoSalvas: boolean;

  constructor(private fb: FormBuilder,
    private toastr:ToastrService) {

    this.validationMessages = {
      eusou:{
        required:'Informe quem vc é'
      },
      meupedido:{
        required:'Informe seu pedido'
      },
      solicitante:{
        required: 'Informe quem está solicidando as informações'
      },
      nome:{
        required: 'Informe seu nome'
      },
      cpf:{
        required:'Informe seu Cpf',
        cpf: 'CPF em formato inválido'
      },
      email:{
        required:'Informe seu email',
        email:'E-mail Inválido'
      },
      descricao:{
        required:'Informe uma descrição',
        maxlength:'Tamanho máximo de 2000 caracteres excedido'
      },
      termos:{
        required:'Campo obrigatório para continuar'
      },
      declaracao:{
        required:'Campo obrigatório'
      }

    }
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngAfterViewInit(): void {

    let controlBlurs: Observable <any>[] = this.formInputElements
    .map((formControl:ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
      this.mudancasNaoSalvas = true;
      console.log(this.cadastroForm)
    })
  }


  ngOnInit(): void {

    this.validaForm();

  }

  validaForm(): void {
    this.cadastroForm = this.fb.group({
      tipoTitular: ['', [Validators.required]],
      pedido:['',[Validators.required]],
      solicitante:['',[Validators.required]],
      nome:['',[Validators.required]],
      cpf:['',[Validators.required, NgBrazilValidators.cpf]],
      email:['',[Validators.required, Validators.email]],
      descricao:['',[Validators.required, Validators.maxLength(2000)]],
      termos: ['', [Validators.requiredTrue]],
      declaracao:['',[Validators.requiredTrue]]
    })
  }


  adicionarContato() {
    this.UsuarioEnvio = Object.assign(this.UsuarioEnvio, this.cadastroForm.value);

    console.log(this.UsuarioEnvio);
    this.toastr.success('Dados Cadastrados com sucesso!', 'Sucesso');
  }

}
