<template>
  <NavbarComponent :user="user" @logout="logout" />

  <main class="flex p-4 pt-0 lg:ml-56 bg-gray-100">
    <div class="rounded-2xl w-full overflow-x-auto bg-white">
      <!-- Barra de pasos -->
      <div class="flex justify-between items-center border-b mx-6 border-gray-300 px-20 py-3 text-sm">
        <div class="flex items-center">
          <p :class="{ 'text-blue-500 font-semibold': currentStep === 1, 'text-gray-400': currentStep !== 1 }"
            class="text-blue-500">1. Cargar firmantes</p>
        </div>
        <div class="flex items-center">
          <p :class="{ 'text-blue-500 font-semibold': currentStep === 2, 'text-gray-400': currentStep !== 2 }"
            class="text-blue-500">2. Cargar documento</p>
        </div>
        <div class="flex items-center">
          <p :class="{ 'text-blue-500 font-semibold': currentStep === 3, 'text-gray-400': currentStep !== 3 }"
            class="text-blue-500">3. Enviar</p>
        </div>
      </div>

      <!-- Paso 1: Cargar firmantes -->
      <div v-if="currentStep === 1">
        <div class="flex items-center justify-end m-6 mt-4">
          <!-- TODO: si marca que va a firmar el documento... vamos a agarrar la info de perfil y completar los campos automáticamente... se tiene que validar que existan... por ahora lo dejamos off-->
          <!-- <div class="flex items-center">
            <p class="text-gray-400 mr-4">Voy a firmar este documento</p>
            <div class="relative">
              <label class="inline-flex items-center">
                <input type="checkbox" class="hidden" v-model="documentSigned" />
                <div class="w-10 h-3 bg-gray-300 rounded-full mt-1" :style="{ backgroundColor: documentSigned ? 'rgba(59, 130, 246)' : '#D1D5DB' }"></div>
                <div class="absolute w-5 h-5 bg-white border rounded-full transition-transform transform mt-1" :class="{ 'translate-x-full': documentSigned }"></div>
              </label>
            </div>
          </div> -->
          <button class="text-gray-500 hover:text-gray-400 font-bold mr-6"> <i
              class="fas fa-arrow-left mr-2 text-white bg-gray-500 hover:bg-gray-400 rounded-full p-1"></i>Volver</button>
          <button @click="nextStep" class="text-blue-500 hover:text-blue-400 font-bold">Continuar<i
              class="fas fa-arrow-right ml-2 text-white bg-blue-500 hover:bg-blue-400 rounded-full p-1"></i></button>
        </div>

        <!-- MENSAJE DE ERROR -->
        <div v-if="signerError"
          class="m-6 mb-0 text-red-500 bg-red-100 p-2 rounded-md text-center flex justify-between items-center"
          style="width: 460px;">
          <span class="ml-2 font-bold">{{ signerErrorMessage }}</span>
          <button @click="signerError = false"><i
              class="fas fa-times text-lg cursor-pointer text-gray-800 hover:bg-red-300 px-2 rounded-sm"></i></button>
        </div>

        <!-- Campos para los firmantes -->
        <div class="m-6">
          <div v-for="(signer, index) in signers" :key="index" class="mb-12">
            <div class="flex items-center">
              <input type="text" v-model="signer.name"
                :placeholder="index === 0 ? 'Nombre firmante' : 'Nombre firmante ' + (index + 1)"
                class="border-gray-300 border-b-2 w-56 focus:outline-none p-2 pl-0 mb-6 placeholder-gray-800 mr-12">
              <input type="text" v-model="signer.lastName"
                :placeholder="index === 0 ? 'Apellido firmante' : 'Apellido firmante ' + (index + 1)"
                class="border-gray-300 border-b-2 w-56 focus:outline-none p-2 pl-0 mb-6 placeholder-gray-800 mr-12">
              <input @input="validateDNI(index)" type="text" v-model="signer.dni"
                :placeholder="index === 0 ? 'DNI / CI firmante' : 'DNI / CI firmante ' + (index + 1)"
                class="border-gray-300 border-b-2 w-56 focus:outline-none p-2 pl-0 mb-6 placeholder-gray-800">
            </div>
            <div class="flex items-center">
              <select v-model="signer.contact" class="p-2 mr-10 w-36 rounded border border-gray-300">
                <option value="wpp" selected>WhatsApp</option>
                <option value="mail">Mail</option>
              </select>
              <!-- Mostrar el campo de correo electrónico solo si la opción seleccionada es 'mail' -->
              <input v-if="signer.contact === 'mail'" type="email" v-model="signer.email" placeholder='Email'
                class="border-gray-300 border-b-2 w-56 focus:outline-none p-2 placeholder-gray-800"
                style="margin-right: 104px">
              <!-- Mostrar los campos de área y teléfono solo si la opción seleccionada es 'wpp' -->
              <template v-else>
                <select v-model="signer.areaCode" placeholder="Área"
                  class="border-gray-300 border-b-2 w-35 focus:outline-none p-2 pl-0 mr-6 placeholder-gray-800">
                  <option value="549" selected>🇦🇷 +549</option>
                  <option value="111">🇪🇸 +111</option>
                  <option value="222">🇨🇱 +222</option>
                  <option value="333">🇷🇺 +333</option>
                  <option value="444">🇨🇷 +444</option>
                  <option value="555">🇧🇷 +555</option>
                </select>
                <input type="number" v-model="signer.phoneNumber" placeholder="Teléfono"
                  class="border-gray-300 border-b-2 w-56 focus:outline-none p-2 placeholder-gray-800">
              </template>
              <div v-show="signers.length > 1" class="flex flex-col">
                <!-- <label class="inline-flex items-center ml-8">
                  <input type="checkbox" class="mr-2 ml-0.5 cursor-pointer h-4 w-4">
                  <span class="text-gray-500 hover:text-gray-400 cursor-pointer">Guardar como contacto</span>
                </label> -->
                <button @click="removeSigner(index)" class="flex items-center ml-8">
                  <i class="fas fa-minus-circle text-red-500 mr-2 text-xl"></i>
                  <span class="text-gray-500 hover:text-gray-400">Eliminar firmante</span>
                </button>
              </div>
            </div>
          </div>

          <!-- MENSAJE DE ERROR -->
          <div v-if="maxSignersError"
            class="mb-12 text-red-500 bg-red-100 p-2 rounded-md text-center flex justify-between items-center"
            style="width: 460px;">
            <span class="ml-2 font-bold">{{ maxSignersErrorMessage }}</span>
            <button @click="maxSignersError = false"><i
                class="fas fa-times text-lg cursor-pointer text-gray-800 hover:bg-red-300 px-2 rounded-sm"></i></button>
          </div>

          <button @click="addSigner"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 font-bold rounded-full"><i
              class="fas fa-search-plus mr-2"></i>Agregar firmante</button>
        </div>
      </div>

      <!-- Paso 2: Cargar documento -->
      <div v-if="currentStep === 2">
        <div class="flex items-center justify-between m-6" style="margin-top: 14px">
          <div class="flex items-center text-lg">
            <input type="text" v-model="documentId"
              class="border-b border-gray-300 mr-4 placeholder-black focus:outline-none w-64"
              placeholder="Id / Nombre del documento">
            <i class="fas fa-edit text-gray-400"></i>
          </div>
          <div class="flex items-center">
            <button @click="previousStep" class="text-blue-500 hover:text-blue-400 font-bold mr-6"><i
                class="fas fa-arrow-left mr-2 text-white bg-blue-500 hover:bg-blue-400 rounded-full p-1"></i>Volver</button>
            <button @click="nextStep" class="text-blue-500 hover:text-blue-400 font-bold">Continuar<i
                class="fas fa-arrow-right ml-2 text-white bg-blue-500 hover:bg-blue-400 rounded-full p-1"></i></button>
          </div>
        </div>

        <!-- Error para ID o nombre del documento -->
        <div v-if="documentIdError"
          class="m-6 mb-0 text-red-500 bg-red-100 p-2 rounded-md text-center text-blue-900 flex justify-between items-center w-96">
          <span class="ml-2 font-bold">{{ documentIdErrorMessage }}</span>
          <button @click="removeErrorMessage('documentIdError')"><i
              class="fas fa-times text-lg cursor-pointer text-gray-800 hover:bg-red-300 px-2 rounded-sm"></i></button>
        </div>

        <ul class="ml-6">
          <li class="mb-2 text-gray-500 flex items-center justify-between w-80">
            <span>Posicionar automáticamente</span>
            <div class="flex items-center">
              <div class="relative mr-4">
                <label class="inline-flex items-center mt-1 cursor-pointer">
                  <input type="checkbox" class="hidden" v-model="automaticPositionChecked" />
                  <div class="w-10 h-3 bg-gray-300 rounded-full mt-1"
                    :style="{ backgroundColor: automaticPositionChecked ? 'rgba(59, 130, 246)' : '#D1D5DB' }"></div>
                  <div class="absolute w-5 h-5 bg-white border rounded-full transition-transform transform mt-1"
                    :class="{ 'translate-x-full': automaticPositionChecked }"></div>
                </label>
              </div>
              <i @mouseover="showInfoMessage = 'automaticPosition'" @mouseleave="showInfoMessage = false"
                class="fas fa-info-circle text-xl mt-1 hover:text-gray-400 cursor-pointer"></i>
              <div v-if="showInfoMessage === 'automaticPosition'"
                class="absolute bg-gray-200 rounded-lg text-sm py-3 px-3 w-1/5 top-1/5 right-0 mr-96 text-gray-700 shadow-lg z-10">
                <p>Al seleccionar esta opción, las firmas se posicionarán automáticamente al pie de la última página.
                  De lo contrario, el firmante deberá elegir la posición de su firma durante el proceso. Sí desea fijar
                  una
                  posición en particular comunicarse con soporte@firmaxw.com</p>
              </div>
            </div>
          </li>
        </ul>

        <!-- DIV CONTENEDOR DE ARCHIVOS -->
        <div class="m-6" @dragover.prevent @drop.prevent="handleDrop">
          <label for="fileInput" style="width: 550px;"
            class="w-96 h-60 mx-auto flex flex-col items-center text-center px-4 py-6 hover:bg-blue-100 cursor-pointer border-4 border-blue-400 border-dashed">
            <i class="far fa-file text-gray-400 fa-4x mb-4"></i>
            <p class="text-gray-400 px-32">Arrastrar y soltar el documento aquí o:</p>
            <button @click="openFileInput"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 font-bold rounded-full mt-2"><i
                class="fas fa-search-plus mr-2"></i>Seleccionar archivo</button>
            <input id="fileInput" type='file' accept=".pdf, .docx, .png, .jpg, .jpeg" class="hidden"
              @change="handleFileChange" multiple />
          </label>
        </div>

        <!-- MENSAJE CARGANDO -->
        <div v-if="loading" class="m-6 text-center">
          <div class="inline-block w-24 h-1 bg-blue-500 rounded-full animate-pulse"></div>
          <p class="mt-2 text-gray-500">Cargando...</p>
        </div>

        <!-- MENSAJE DE ERROR -->
        <div v-if="errorMessage"
          class="m-6 text-red-500 bg-red-100 p-2 rounded-md text-center text-blue-900 flex justify-between items-center w-96">
          <span class="ml-2 font-bold">{{ errorMessage }}</span>
          <button @click="removeErrorMessage('errorMessage')"><i
              class="fas fa-times text-lg cursor-pointer text-gray-800 hover:bg-red-300 px-2 rounded-sm"></i></button>
        </div>

        <!-- MOSTRAR ARCHIVOS -->
        <div v-if="fileNames.length > 0" class="m-6 mt-2">
          <div v-for="(name, index) in fileNames" :key="index"
            class="bg-blue-100 p-2 rounded-md text-center text-blue-900 mb-2 flex justify-between items-center w-96">
            <span class="text-black ml-2">{{ index + 1 }}. {{ name }}</span>
            <button @click="removeFile(index)"><i
                class="fas fa-times text-lg cursor-pointer text-gray-800 hover:bg-blue-300 px-2 rounded-sm"></i></button>
          </div>
        </div>
      </div>

      <!-- Paso 3: Enviar -->
      <div v-if="currentStep === 3">
        <!-- <div class="flex items-center justify-end m-6 mt-4">
          <button @click="previousStep" class="text-blue-500 hover:text-blue-400 font-bold mr-6"><i class="fas fa-arrow-left mr-2 text-white bg-blue-500 hover:bg-blue-400 rounded-full p-1"></i>Volver</button>
          <button class="text-gray-500 hover:text-gray-400 font-bold">Continuar<i class="fas fa-arrow-right ml-2 text-white bg-gray-500 hover:bg-gray-400 rounded-full p-1"></i></button>
        </div> -->

        <div class="m-6">
          <div v-for="(signer, index) in todasLasSolicitudes.urls" :key="'signer-' + index">
            <div class="flex items-center">
              <input type="text" v-model="signer.name"
                class="border-b-2 border-gray-300 p-2 pl-0 mr-6 mb-6 placeholder-gray-800 focus:outline-none w-56"
                placeholder="Nombre">
              <input v-if="signer.method === 'wpp'" type="number" v-model="signer.contact"
                class="border-b-2 border-gray-300 p-2 pl-0 mr-6 mb-6 placeholder-gray-800 focus:outline-none w-56"
                placeholder="Número">
              <input v-else type="text" v-model="signer.contact"
                class="border-b-2 border-gray-300 p-2 pl-0 mr-6 mb-6 placeholder-gray-800 focus:outline-none w-56"
                placeholder="Correo">
            </div>

            <div class="flex items-center justify-start mt-4 mb-8">
              <a :href="signer.link" target="_blank"
                class="bg-gray-200 p-2 rounded-xl text-blue-600 hover:text-blue-500 hover:underline text-lg mr-8">
                {{ signer.link }}
                <span class="ml-10">
                  <i v-if="!copiedLinks.includes(signer.link)" @click.prevent="copyLink(signer.link)"
                    class="fas fa-clone ml-2 mr-1 text-blue-400 hover:text-blue-300 cursor-pointer"></i>
                  <i v-else class="fas fa-check-circle ml-2 mr-1 text-green-400"></i>
                </span>
              </a>
            </div>


            <div class="flex items-center justify-start">
              <span>Pedir foto de DNI/CI + foto Selfie</span>
              <div class="flex items-center">
                <div class="relative ml-3">
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="hidden" v-model="sendDNI[index]" @change="handleDNIChange(index, signer)"/>
                    <div class="w-10 h-3 bg-gray-300 rounded-full"
                      :style="{ backgroundColor: sendDNI[index] ? 'rgba(59, 130, 246)' : '#D1D5DB' }"></div>
                    <div class=" absolute w-5 h-5 bg-white border rounded-full transition-transform transform"
                      :class="{ 'translate-x-full': sendDNI[index] }"></div>
                  </label>
                </div>
                <i @mouseover="showInfoMessage = 'photoId'" @mouseleave="showInfoMessage = false"
                  class="fas fa-info-circle text-xl ml-3 text-gray-500 hover:text-gray-400 cursor-pointer"></i>
                <div v-if="showInfoMessage === 'photoId'"
                  class="absolute bg-gray-200 rounded-lg text-sm py-1 px-6 w-1/5 top-1/5 text-gray-700 shadow-lg z-10 mr-4 mt-32">
                  <p>El firmante deberá tomar una foto del documento de identidad por ambos lados + foto selfie para
                    firmar (FxW no valida las fotos).
                    Las fotos quedarán en el informe de firmas. Solo se puede solicitar esta información con nuestro
                    asistente FirmIA.
                  </p>
                </div>
              </div>

              <div class="flex items-center ml-16">
                <i v-if="signer.method === 'mail'" class="fas fa-envelope text-xl mr-2 text-gray-500"></i>
                <i v-else-if="signer.method === 'wpp'" class="fab fa-whatsapp text-xl mr-2 text-gray-500"></i>
                <input type="checkbox" v-model="signer.sendWithFirmIA" class="mr-2 ml-0.5 cursor-pointer h-4 w-4"
                  @change="handleCheckboxChange(signer)">
                <p>Enviar con FirmIA</p>
                <i @mouseover="showInfoMessage = true" @mouseleave="showInfoMessage = false"
                  class="fas fa-info-circle text-xl ml-2 text-gray-500 hover:text-gray-400 cursor-pointer"></i>
                <div v-if="showInfoMessage === true"
                  class="absolute bg-gray-200 rounded-lg text-sm py-1 px-6 w-1/5 top-1/5 text-gray-700 shadow-lg z-10 mr-4 mt-32">
                  <p>Envía el documento automáticamente mediante nuestro asistente de WhatsApp FirmIA</p>
                </div>
              </div>
            </div>

          </div>

          <div class="flex justify-center">
            <button @click="updateData"
              class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 font-bold rounded-full mr-4">
              <i class="fas fa-pen mr-2"></i>Actualizar datos
            </button>
            <router-link to="/requests?enviado=true">
              <button @click="sendDocuments"
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 font-bold rounded-full">
                <i class="fas fa-file mr-2"></i>Enviar documento
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </main>

  <PopUpComponent :show="showPopUp" :message="PopUpMessage" />
  <ModalPurchaseComponent v-if="showLimitExceededModal" :show="showLimitExceededModal"
    @close="showLimitExceededModal = false" />
</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue';
import PopUpComponent from '../components/PopUpComponent.vue';
import ModalPurchaseComponent from '../components/ModalPurchaseComponent.vue';
import axios from 'axios';
import { getCookie } from '../helpers/cookies';

export default {
  emits: ['login', 'logout'],
  props: ['user'],
  components: {
    NavbarComponent,
    PopUpComponent,
    ModalPurchaseComponent
  },
  data() {
    return {
      currentStep: 1,
      loading: false,
      fileNames: [],
      errorMessage: '',
      documentSelected: false,
      signers: [{ name: '', lastName: '', dni: '', areaCode: '', phoneNumber: '', contact: 'wpp' }],
      signerError: false,
      signerErrorMessage: 'Por favor, completa todos los datos de los firmantes.',
      maxSignersError: false,
      maxSignersErrorMessage: 'Se ha alcanzado el límite máximo de firmantes (6).',
      documentSigned: false,
      documentId: '',
      automaticPositionChecked: false, // TODO: @luis, agarra esta info para el crear doc
      photoIdChecked: false, // TODO: @luis, agarra esta info para el crear doc
      showInfoMessage: null,
      copiedLinks: [],
      base64Doc: '',
      showPopUp: false,
      showLimitExceededModal: false,
      PopUpMessage: 'Por favor corrobore los datos',
      sendWithFirmIABodys: [],
      sendDNI: [false, false, false, false, false, false],
    };
  },
  methods: {
    logout() {
      this.$emit('logout');
    },
    openFileInput() { // Subir archivos mediante el botón
      document.getElementById('fileInput').click();
    },
    toggleInfo(infoType) { // Click ícono info
      this.showInfoMessage = this.showInfoMessage === infoType ? null : infoType;
    },
    validateDNI(index) { // Permitir solo números y los caracteres ., -, /
      const regex = /^[0-9./-]*$/;
      const dni = this.signers[index].dni;

      if (!regex.test(dni)) { // Elimina caracteres no permitidos
        this.signers[index].dni = dni.replace(/[^0-9./-]/g, '');
      }
    },
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    async nextStep() {
      // Verificar si todos los campos del firmante están completos o el checkbox tildado
      if (this.currentStep === 1 && !this.documentSigned && this.signers.some(signer => {
        if (signer.contact === 'wpp') {
          return signer.name.trim() === '' || signer.lastName.trim() === '' || String(signer.dni).trim() === '' || String(signer.areaCode).trim() === '' || String(signer.phoneNumber).trim() === '' || signer.contact.trim() === '';
        }
        else if (signer.contact === 'mail') {
          // Verificar si el contacto es por correo electrónico y si el campo de correo electrónico está vacío
          return signer.name.trim() === '' || signer.lastName.trim() === '' || String(signer.dni).trim() === '' || (!signer.email || signer.email.trim() === '' || !signer.email.includes('@')) || signer.contact.trim() === '';
        }
      })) {
        this.signerError = true;
        return; // No avanzar al siguiente paso
      }

      // Limpiar msj de error de firmantes al avanzar de paso después de haber ingresado los nombres
      if (this.currentStep === 1) {
        this.signerError = false;
      }

      // Almacenar los datos de los firmantes en una propiedad del componente
      this.signersData = this.signers.map(signer => ({
        name: signer.name + ' ' + signer.lastName,
        dni: signer.dni,
        email: signer.email,
        phone: `${signer.areaCode}${signer.phoneNumber}`,
        method: signer.contact
      }));

      // HOT FIX: pone el dato phone segun el metodo... ya que la api no acepta parametro de mail.. toma todo como uno 
      for (let element of this.signersData) {
        if (element.method === 'wpp') {
          element.email = null;
        } else {
          element.phone = element.email;
        }
      }

      // Verificar si no se ha seleccionado ningún documento
      if (this.currentStep === 2 && this.fileNames.length === 0) {
        this.errorMessage = 'Seleccione un documento.';
        return;
      }

      // Crear doc y mostrar popup
      if (this.currentStep === 2) {
        this.loading = true;
        await this.createMission();
      }

      // Si pasa todas las validaciones, avanzar al siguiente paso
      if (!this.showLimitExceededModal) {
        if (this.currentStep === 2) {
          this.showPopUp = true;
          setTimeout(() => {
            this.showPopUp = false;
          }, 5000);
        }
        this.errorMessage = '';
        this.currentStep++;
      }
    },
    // TODO: tendria que hacer que todos los checbox usen el mismo metodo de index... por alguna razon funciona mejor
    handleDNIChange(index, signer) {
      console.log('sendWithFirmIABodys:', this.sendWithFirmIABodys);
      if (this.sendDNI[index]) {
        signer.sendWithFirmIA = true;
        if (this.documentId === '') {
          this.documentId = 'Documento';
        }
        for (let i = 0; i < this.sendWithFirmIABodys.length; i++) {
          if (this.sendWithFirmIABodys[i].phone === signer.contact) {
            this.sendWithFirmIABodys.splice(i, 1);
          }
        }
        const body = {
          "phone": signer.contact,
          "flow_id": 69,
          "variables": {
            "company": getCookie('token'),
            "name": signer.name,
            "sign_link": signer.link,
            "document_name": this.documentId ?? 'Documento',
            "document_link": `https://arg-files.s3.amazonaws.com/${this.todasLasSolicitudes.id_seguimiento}.pdf`,
            "id_custom": signer.id_custom,
            "send_dni": true
          }
        }
        this.sendWithFirmIABodys.push(body);
      } else {
        for (const element of this.sendWithFirmIABodys) {
          if (element.phone === signer.contact) {
            element.variables.send_dni = false;
          }
        }
      }
    },
    handleCheckboxChange(signer) {
      // Verificar si el checkbox está tildado
      if (signer.sendWithFirmIA) {
        if (this.documentId === '') {
          this.documentId = 'Documento';
        }
        const body = {
          "phone": signer.contact,
          "flow_id": 69,
          "variables": {
            "company": getCookie('token'),
            "name": signer.name,
            "sign_link": signer.link,
            "document_name": this.documentId ?? 'Documento',
            "document_link": `https://arg-files.s3.amazonaws.com/${this.todasLasSolicitudes.id_seguimiento}.pdf`,
            "id_custom": signer.id_custom,
            "send_dni": false
          }
        }
        this.sendWithFirmIABodys.push(body);
        console.log('sendWithFirmIABodys:', this.sendWithFirmIABodys);
      } else {
        for (let i = 0; i < this.sendWithFirmIABodys.length; i++) {
          if (this.sendWithFirmIABodys[i].phone === signer.contact) {
            this.sendWithFirmIABodys.splice(i, 1);
          }
        }
      }
    },
    async sendDocuments() {
      for (let body of this.sendWithFirmIABodys) {
        let data = JSON.stringify(body);
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://firmasxw.com/wpp/sendFlow',
          headers: {
            'Content-Type': 'application/json'
          },
          data: data
        };

        await axios.request(config);
      }
    },
    async updateMission() {
      const headers = {
        'Content-Type': 'application/json',
        'x-api-key': getCookie('token')
      };

      const body = {
        datos_firmantes: this.todasLasSolicitudes.urls,
      };

      try {
        const response = await axios.post('https://firmasxw.com/test/modifySignatureRequest', body, { headers });
        console.log('Respuesta de la solicitud:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    },
    async updateData() { // Datos actualizados de los input    
      // Mostrar popup
      this.PopUpMessage = 'Datos actualizados';
      this.showPopUp = true;

      await this.updateMission();
      setTimeout(() => {
        this.showPopUp = false;
      }, 5000);

    },
    async createMission() {
      const headers = {
        'Content-Type': 'application/json',
        'x-api-key': getCookie('token')
      };

      // TODO: arreglar el client name
      const body = {
        datos_firmantes: this.signersData,
        id_custom_client: this.documentId ?? null,
        document: this.base64Doc,
        webhook_url: 'https://firmasxw.com/test/webhook',
        cliente: 'luis',
        fixed_signature: this.automaticPositionChecked,
      };

      try {
        const response = await axios.post('https://firmasxw.com/test/signatureRequest', body, { headers });
        this.todasLasSolicitudes = response.data;

        // this.todasLasSolicitudes = {
        //   "id_seguimiento": "b3cf2db0c9ce729e4d",
        //   "created_at": 1718730225,
        //   "urls": [
        //     {
        //       "link": "https://firmasxw.com/?tkn=18110d1158b725205131",
        //       "name": "Luis Lacoste",
        //       "dni": "43795269",
        //       "contact": "5493586005012",
        //       "method": "wpp",
        //       "id_custom": "18110d1158b725205131"
        //     },
        //     {
        //       "link": "https://firmasxw.com/?tkn=65f0132c2c4ff97bf6d9",
        //       "name": "name2",
        //       "dni": "43795269",
        //       "contact": "luis@hotmail.com",
        //       "method": "mail",
        //       "id_custom": "65f0132c2c4ff97bf6d9"
        //     }
        //   ]
        // };
        for (let element of this.todasLasSolicitudes.urls) {
          element.sendWithFirmIA = false;
          element.send_dni = false;
        }
        return this.todasLasSolicitudes;
      } catch (error) {
        if (error.response && error.response.status === 429) {
          // Si la solicitud falla debido a "Demasiadas solicitudes", muestra la modal
          this.showLimitExceededModal = true;
          console.log('showLimitExceededModal', this.showLimitExceededModal);
          return this.showLimitExceededModal;
        } else {
          // Manejar otros errores de manera diferente, si es necesario
          console.error('Error en la solicitud:', error);
        }
      }
    },
    handleDrop(event) {
      const files = event.dataTransfer.files;
      const file = files[0]; // Obtener el primer archivo arrastrado
      this.handleFile(file);
    },
    handleFileChange(event) {
      const file = event.target.files[0]; // Obtener el primer archivo del evento
      this.handleFile(file);
      if (!this.documentId) { // Si no se ingresó un nombre de documento, se autocompleta
        this.documentId = this.removeFileExtension(file.name);
      }
    },
    removeFileExtension(filename) {
      return filename.replace(/\.[^/.]+$/, ""); // Eliminar la extensión del nombre del archivo
    },
    sendToAPI(base64Data) {
      // Enviar los datos a la API
      console.log('Base64 data:', base64Data);
    },
    handleFile(file) {
      this.loading = true;
      this.errorMessage = '';
      this.documentSelected = false;

      // TODO: 
      if (this.isValidFileType(file)) {
        let reader = new FileReader();

        reader.onload = () => {
          this.base64Doc = reader.result.split(',')[1]; // Extracting base64 data from result

          setTimeout(() => {
            this.fileNames = [file.name]; // Reemplazar los nombres de archivo con el nuevo archivo
            this.loading = false;
            this.documentSelected = true;
          }, 1000); // Tiempo de simulación de carga
        };
        reader.readAsDataURL(file);
      } else {
        this.errorMessage = 'Solo archivos PDF, DOCX, JPG o PNG.';
        this.loading = false;
      }
    },
    removeFile(index) {
      this.fileNames.splice(index, 1);
      if (this.fileNames.length === 0) {
        this.documentSelected = false; // Si no hay archivos seleccionados, documentSelected es falso
      }
    },
    removeErrorMessage(errorType) {
      if (errorType === 'errorMessage') {
        this.errorMessage = '';
      }
    },
    isValidFileType(file) {
      const allowedExtensions = ['.pdf', '.docx', '.jpg', '.jpeg', '.png'];
      const fileType = '.' + file.name.split('.').pop();
      return allowedExtensions.includes(fileType.toLowerCase());
    },
    addSigner() {
      if (this.signers.length < 6) {
        this.signers.push({ name: '', lastName: '', dni: '', areaCode: '', phoneNumber: '', contact: 'wpp' }); // Agregar un nuevo objeto de firmante con campos vacíos
      } else {
        this.maxSignersError = true; // Mostrar el mensaje de error
      }
    },
    removeSigner(index) {
      // Verificar si hay más de un firmante antes de eliminar
      if (this.signers.length > 1) {
        this.signers.splice(index, 1); // Eliminar el firmante en la posición especificada
      } else {
        // Limpiar los campos del primer firmante en lugar de eliminarlo
        this.signers[index].name = '';
        this.signers[index].lastName = '';
        this.signers[index].dni = '';
        this.signers[index].areaCode = '';
        this.signers[index].phoneNumber = '';
        this.signers[index].contact = '';
      }
    },
    copyLink(link) { // Método para copiar el link
      const el = document.createElement('textarea');
      el.value = link;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.copiedLinks.push(link);

      setTimeout(() => { // Eliminar el enlace copiado después de dos segundos
        const index = this.copiedLinks.indexOf(link);
        if (index !== -1) {
          this.copiedLinks.splice(index, 1);
        }
      }, 2000);
    },
  }

}
</script>