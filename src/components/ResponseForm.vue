<script setup>
import { ref, computed } from 'vue'

const lastName = ref('')
const name = ref('')
const company = ref('')
const pickedPosition = ref('')
const messageTitle = ref('')
const userMessage = ref('')
const email = ref('')
const country = ref('')
const city = ref('')
const postcode = ref('')
const address = ref('')
const phoneNumber = ref('')
const errors = ref({})

const validateForm = () => {
  errors.value = {}

  const isCyrillic = (text) => /^[а-яА-ЯёЁіІїЇєЄґҐ\s-]+$/.test(text)
  const isNumeric = (text) => /^[0-9]+$/.test(text)
  const isValidAddress = (text) => /^[\dа-яА-ЯёЁіІїЇєЄґҐ\s\/,\-]+$/.test(text)
  const isValidPhone = (text) => /^\(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(text)

  if (!lastName.value || !isCyrillic(lastName.value)) {
    errors.value.lastName = 'Прізвище повинно містити тільки кирилицю'
  }

  if (!name.value || !isCyrillic(name.value)) {
    errors.value.name = "Ім'я повинно містити тільки кирилицю"
  }

  if (!isCyrillic(name.value)) {
    errors.value.company = 'Організації повинна містити тільки кирилицю'
  }

  if (!isCyrillic(messageTitle.value)) {
    errors.value.messageTitle =
      'Тема повідомлення повинна містити тільки кирилицю'
  }

  if (!userMessage.value) {
    errors.value.userMessage = "Повідомлення є обов'язковим"
  }

  if (!isCyrillic(country.value)) {
    errors.value.country = 'Країна повинна містити тільки кирилицю'
  }

  if (!isCyrillic(city.value)) {
    errors.value.city = 'Місто повинно містити тільки кирилицю'
  }

  if (!isNumeric(postcode.value)) {
    errors.value.postcode = 'Індекс повинен містити тільки цифри'
  }

  if (!isValidAddress(address.value)) {
    errors.value.address =
      'Адресса повинена містити тільки цифри, кирилицю, а також "/" , "-", і ","'
  }

  if (!email.value) {
    errors.value.email = "Email є обов'язковим"
  }

  if (!phoneNumber.value || !isValidPhone(phoneNumber.value)) {
    errors.value.phoneNumber = 'Некоректний формат телефону'
  }

  return Object.keys(errors.value).length === 0
}

const submitForm = () => {
  if (validateForm()) {
    alert('Відправлено')

    lastName.value = ''
    name.value = ''
    company.value = ''
    pickedPosition.value = ''
    messageTitle.value = ''
    userMessage.value = ''
    email.value = ''
    country.value = ''
    city.value = ''
    postcode.value = ''
    address.value = ''
    phoneNumber.value = ''
    errors.value = ''
  }
}

const clearError = (field) => {
  errors.value[field] = ''
}
</script>

<template>
  <section>
    <div class="container">
      <form class="form" @submit.prevent="submitForm">
        <div class="form-row">
          <div class="form-col">
            <h2 class="form-title">Представтеся, будь ласка</h2>

            <div class="form-group">
              <label for="lastName" class="form-label">* Прізвище</label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.lastName }"
                id="lastName"
                v-model="lastName"
                @focus="clearError('lastName')"
              />
              <transition name="fade">
                <small v-if="errors.lastName" class="text-danger">{{
                  errors.lastName
                }}</small>
              </transition>
            </div>

            <div class="form-group">
              <label for="name" class="form-label">* Ім'я</label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.name }"
                id="name"
                v-model="name"
                @focus="clearError('name')"
              />
              <transition name="fade">
                <small v-if="errors.name" class="text-danger">{{
                  errors.name
                }}</small>
              </transition>
            </div>

            <div class="form-group">
              <label for="companyAndPosition" class="form-label"
                >Організація та посада</label
              >
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.company }"
                id="companyAndPosition"
                v-model="company"
                @focus="clearError('company')"
              />
              <transition name="fade">
                <small v-if="errors.company" class="text-danger">{{
                  errors.company
                }}</small>
              </transition>
            </div>

            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="radio"
                value="customer"
                id="customer"
                checked
                v-model="pickedPosition"
              />
              <label class="form-check-label" for="customer">Споживач</label>
            </div>

            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="radio"
                value="medicalRep"
                id="medicalRep"
                v-model="pickedPosition"
              />
              <label class="form-check-label" for="medicalRep"
                >Медичний представник</label
              >
            </div>

            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="radio"
                value="journalist"
                id="journalist"
                v-model="pickedPosition"
              />
              <label class="form-check-label" for="journalist">Журналіст</label>
            </div>

            <h2 class="form-title mt mb">Повідомлення</h2>

            <div class="form-group">
              <label for="messageTitle" class="form-label"
                >Тема повідомлення</label
              >
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.userMessage }"
                id="messageTitle"
                v-model="messageTitle"
                @focus="clearError('messageTitle')"
              />
              <transition name="fade">
                <small v-if="errors.messageTitle" class="text-danger">{{
                  errors.messageTitle
                }}</small>
              </transition>
            </div>

            <div class="form-group mb-0">
              <label for="userMessage" class="form-label">* Повідомлення</label>
              <textarea
                class="form-control"
                :class="{ 'is-invalid': errors.userMessage }"
                id="texMessage"
                rows="3"
                v-model="userMessage"
                @focus="clearError('userMessage')"
              ></textarea>
              <transition name="fade">
                <small v-if="errors.userMessage" class="text-danger">{{
                  errors.userMessage
                }}</small>
              </transition>
            </div>
          </div>

          <div class="form-col">
            <h2 class="form-title">Представтеся, будь ласка</h2>

            <div class="form-group">
              <label for="email" class="form-label">* Email</label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.email }"
                id="email"
                v-model="email"
                @focus="clearError('email')"
              />
              <transition name="fade">
                <small v-if="errors.email" class="text-danger">{{
                  errors.email
                }}</small>
              </transition>
            </div>

            <div class="form-group">
              <label for="country" class="form-label">Країна</label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.country }"
                id="country"
                v-model="country"
                @focus="clearError('country')"
              />
              <transition name="fade">
                <small v-if="errors.country" class="text-danger">{{
                  errors.country
                }}</small>
              </transition>
            </div>

            <div class="form-group">
              <label for="city" class="form-label">Місто</label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.city }"
                id="city"
                v-model="city"
                @focus="clearError('city')"
              />
              <transition name="fade">
                <small v-if="errors.city" class="text-danger">{{
                  errors.city
                }}</small>
              </transition>
            </div>

            <div class="form-group">
              <label for="postcode" class="form-label">Індекс</label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.postcode }"
                id="postcode"
                v-model="postcode"
                @focus="clearError('postcode')"
              />
              <transition name="fade">
                <small v-if="errors.postcode" class="text-danger">{{
                  errors.postcode
                }}</small>
              </transition>
            </div>

            <div class="form-group">
              <label for="address" class="form-label">Адреса</label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.address }"
                id="address"
                v-model="address"
                @focus="clearError('address')"
              />
              <transition name="fade">
                <small v-if="errors.address" class="text-danger">{{
                  errors.address
                }}</small>
              </transition>
            </div>

            <div class="form-group">
              <label for="phoneNumber" class="form-label">* Телефон</label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.phoneNumber }"
                id="phoneNumber"
                placeholder="(___) ___-__-__"
                v-model="phoneNumber"
                @focus="clearError('phoneNumber')"
              />
              <transition name="fade">
                <small v-if="errors.phoneNumber" class="text-danger">{{
                  errors.phoneNumber
                }}</small>
              </transition>
            </div>

            <button type="submit" class="btn mt-auto">відправити</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped lang="scss">
section {
  padding-top: 60px;
  padding-bottom: 80px;

  @media (max-width: 430px) {
    padding-top: 40px;
    padding-bottom: 40px;
  }
}

.container {
  width: 100%;
  max-width: 633px;
  margin-right: auto;
  margin-left: auto;
  padding-left: 24px;
  padding-right: 24px;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 50px;

  @media (max-width: 430px) {
    gap: 40px;
  }
}

.form-col {
  display: flex;
  min-width: 246px;
  max-width: 100%;
  flex-direction: column;
  flex: 1;
}

.form-title {
  margin-bottom: 20px;
  padding: 0;
  font-size: 18px;
  text-transform: uppercase;

  @media (max-width: 430px) {
    /* font-size: 14px; */
  }

  &.mt {
    margin-top: 28px;
  }

  &.mb {
    margin-bottom: 18px;
  }
}

.form-group {
  margin-bottom: 15px;

  @media (max-width: 430px) {
    margin-bottom: 20px;
  }

  textarea {
    min-height: 85px;
    padding-top: 13px;
    padding-bottom: 13px;
    resize: none;
  }

  textarea::placeholder {
    color: #000;
    text-transform: uppercase;
  }
}

.form-control {
  display: block;
  width: 100%;
  padding: 7px 12px;
  font-family: 'Roboto';
  font-size: 12px;
  font-weight: 400;
  line-height: 1;
  /* text-transform: uppercase; */
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #000;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  @media (max-width: 430px) {
    padding: 11px 12px;
    font-size: 14px;
  }

  &.is-invalid {
    border-color: #ff0000;

    & + small {
      display: block;
      margin-top: 5px;
      line-height: 1.5;
      color: #ff0000;
    }
  }

  &:focus {
    border-color: #0d6efd;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.25);
  }

  &::-webkit-input-placeholder {
    color: #6c757d;
    opacity: 1;
  }

  &::-moz-placeholder {
    color: #6c757d;
    opacity: 1;
  }

  &:-ms-input-placeholder {
    color: #6c757d;
    opacity: 1;
  }

  &::placeholder {
    color: #6c757d;
    opacity: 1;
  }

  &:disabled {
    background-color: #e9ecef;
    opacity: 1;
  }

  &:disabled:focus {
    box-shadow: none;
  }
}

.form-label {
  display: block;
  margin-bottom: 5px;
  font-size: 12px;
  line-height: 1;
  text-transform: uppercase;
}

.form-check {
  display: flex;
  align-items: center;
  position: relative;

  @media (max-width: 430px) {
    margin-bottom: 10px;
  }
}

.form-check-input {
  position: absolute;
  width: 10px;
  height: 10px;
  margin: 0;
  border: 1px solid #000;
  border-radius: 50%;
  appearance: none;
  background-color: #fff;
  outline: none;
  transition: border-color 0.2s, background-color 0.2s;
  cursor: pointer;

  &:checked {
    background-color: #fff;
  }

  &:checked::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #ff0000;
  }
}

.form-check-label {
  margin-left: 18px;
  font-size: 12px;
  text-transform: uppercase;
  cursor: pointer;
}

.btn {
  display: inline-block;
  width: 100%;
  color: #fff;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  background-color: #464646;
  border: 1px solid #303030;
  padding: 3px 12px;
  font-size: 22px;
  font-weight: 400;
  line-height: 1;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:hover {
    color: #fff;
    background-color: #303030;
    border-color: #303030;
  }

  &:focus,
  &.focus {
    box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
  }

  @media (max-width: 430px) {
    padding-top: 8px;
    padding-bottom: 8px;
    margin-top: 20px !important;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
