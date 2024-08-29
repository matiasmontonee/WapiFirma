<li class="mb-2 text-gray-500 flex items-center justify-between w-80">
    <span>Pedir foto de DNI/CI + foto Selfie</span>
    <div class="flex items-center">
        <div class="relative mr-4">
            <label class="inline-flex items-center mt-1 cursor-pointer">
                <input type="checkbox" class="hidden" v-model="photoIdChecked" />
                <div class="w-10 h-3 bg-gray-300 rounded-full mt-1"
                    :style="{backgroundColor: photoIdChecked ? 'rgba(59, 130, 246)' : '#D1D5DB' }"></div>
        <div class="absolute w-5 h-5 bg-white border rounded-full transition-transform transform mt-1"
                    :class="{'translate-x-full': photoIdChecked }"></div>
</label>
              </div >
    <i @mouseover="showInfoMessage = 'photoId'" @mouseleave="showInfoMessage = false"
class="fas fa-info-circle text-xl mt-1 hover:text-gray-400 cursor-pointer" ></i >
    <div v-if="showInfoMessage === 'photoId'"
        class="absolute bg-gray-200 rounded-lg text-sm py-2 px-6 w-1/5 top-1/5 right-0 mr-96 text-gray-700 shadow-lg z-10">
        <p>Requiere que el firmante proporcione una foto de su DNI o CI junto con una selfie para verificación.
        </p>
    </div>
            </div >
          </li>