<template>
  <div class="form">
    <h3 class="form__title">Личные данные</h3>
    <div class="form__row">
      <div class="form__col-3">
        <EpInput
          label="Фамилия"
          v-model="formData.lastName"
          :error="formErrors.lastName"
        />
      </div>
      <div class="form__col-3">
        <EpInput
          label="Имя"
          v-model="formData.firstName"
          :error="formErrors.firstName"
        />
      </div>
      <div class="form__col-3">
        <EpInput
          label="Отчество"
          v-model="formData.middleName"
          :error="formErrors.middleName"
        />
      </div>
    </div>

    <div class="form__row">
      <div class="form__col-2">
        <EpInput
          label="Дата рождения"
          placeholder="дд.мм.гггг"
          v-model="formData.birthday"
          :error="formErrors.birthday"
        />
      </div>
    </div>

    <div class="form__row">
      <div class="form__col">
        <EpInput
          label="E-mail"
          v-model="formData.email"
          :error="formErrors.email"
        />
      </div>
    </div>

    <div class="form__row">
      <EpOptions
        label="Пол"
        name="gender"
        :options="genderOptions"
        v-model="formData.gender"
      />
    </div>

    <h3 class="form__title">Паспортные данные</h3>
    <div class="form__row">
      <div class="form__col-2">
        <EpSelect
          label="Гражданство"
          withFilter
          :options="citizenshipOptions"
          @filter:input="onSelectCitizenshipFilter"
          v-model="formData.citizenship"
          :error="formErrors.citizenship"
        />
      </div>
    </div>

    <template v-if="formData.citizenship">
      <div v-if="isRussiaCitizen" class="form__row">
        <div class="form__col-4">
          <EpInput
            label="Серия паспорта"
            key="passportSeria"
            v-model="formData.passportSeria"
            :error="formErrors.passportSeria"
          />
        </div>
        <div class="form__col-4">
          <EpInput
            label="Номер паспорта"
            key="passportNumber"
            v-model="formData.passportNumber"
            :error="formErrors.passportNumber"
          />
        </div>
        <div class="form__col-2">
          <EpInput
            label="Дата выдачи"
            placeholder="дд.мм.гггг"
            key="passportDate"
            v-model="formData.passportDate"
            :error="formErrors.passportDate"
          />
        </div>
      </div>

      <template v-else>
        <div class="form__row">
          <div class="form__col-2">
            <EpInput
              label="Фамилия на латинице"
              key="lastNameEng"
              v-model="formData.lastNameEng"
              :error="formErrors.lastNameEng"
            />
          </div>
          <div class="form__col-2">
            <EpInput
              label="Имя на латинице"
              key="firstNameEng"
              v-model="formData.firstNameEng"
              :error="formErrors.firstNameEng"
            />
          </div>
        </div>

        <div class="form__row">
          <div class="form__col-4">
            <EpInput
              label="Номер паспорта"
              key="passportNumber"
              v-model="formData.passportNumberEng"
              :error="formErrors.passportNumberEng"
            />
          </div>
          <div class="form__col-4">
            <EpSelect
              label="Страна выдачи"
              key="passportCountry"
              :options="countryOptions"
              v-model="formData.passportCountry"
              :error="formErrors.passportCountry"
            />
          </div>
          <div class="form__col-2">
            <EpSelect
              label="Тип паспорта"
              key="passportType"
              titleKey="type"
              :options="passportTypesOptions"
              v-model="formData.passportType"
              :error="formErrors.passportType"
            />
          </div>
        </div>
      </template>
    </template>

    <div class="form__row">
      <EpOptions
        label="Меняли ли вы фамилию или имя"
        name="isChangeName"
        :options="isChangeNameOptions"
        v-model="formData.changeName"
      />
    </div>
    <template v-if="isShowChangedNamesFields">
      <div class="form__row">
        <div class="form__col-2">
          <EpInput
            label="Предыдущая фамилия"
            v-model="formData.oldLastName"
            :error="formErrors.oldLastName"
          />
        </div>
        <div class="form__col-2">
          <EpInput
            label="Предыдущее имя"
            v-model="formData.oldFirstName"
            :error="formErrors.oldFirstName"
          />
        </div>
      </div>
    </template>

    <button
      class="btn btn--primary form__submit"
      type="submit"
      @click="onSubmitForm"
      :disabled="isLoading"
    >
      {{ !isLoading ? "Отправить" : "Отправка..." }}
    </button>

    <div class="form__hr"></div>
    <button class="btn btn--ternary" @click="fillForm">
      Заполнить форму моками
    </button>
  </div>
</template>

<script>
import EpInput from "@/components/inputs/EpInput";
import EpOptions from "@/components/inputs/EpOptions";
import EpSelect from "@/components/inputs/EpSelect";

import { debounce } from "@/assets/js/debounce";
import * as validators from "@/assets/js/validators";

import citizenshipsData from "@/assets/data/citizenships.json";
import passportTypesData from "@/assets/data/passport-types.json";

const validateScheme = {
  lastName: [
    { validate: validators.required, msg: "Обязательное поле" },
    { validate: validators.isCyrillic, msg: "Только кириллица" },
  ],
  firstName: [
    { validate: validators.required, msg: "Обязательное поле" },
    { validate: validators.isCyrillic, msg: "Только кириллица" },
  ],
  middleName: [
    { validate: validators.required, msg: "Обязательное поле" },
    { validate: validators.isCyrillic, msg: "Только кириллица" },
  ],
  birthday: [
    { validate: validators.isDate, msg: "Введите дату" },
    {
      validate: validators.isDateLowerThatNow,
      msg: "Этот день еще не наступил",
    },
  ],
  email: [{ validate: validators.checkEmail, msg: "Некорректный email" }],
  citizenship: [{ validate: validators.required, msg: "Обязательное поле" }],
  passportSeria: [
    {
      validate: validators.createLengthValidator(4),
      msg: "Необходимо 4 символа",
    },
  ],
  passportNumber: [
    {
      validate: validators.createLengthValidator(6),
      msg: "Необходимо 6 символов",
    },
  ],
  passportDate: [
    { validate: validators.isDate, msg: "Введите дату" },
    {
      validate: validators.isDateLowerThatNow,
      msg: "Этот день еще не наступил",
    },
  ],
  lastNameEng: [
    { validate: validators.required, msg: "Обязательное поле" },
    { validate: validators.isLatin, msg: "Только латиница" },
  ],
  firstNameEng: [
    { validate: validators.required, msg: "Обязательное поле" },
    { validate: validators.isLatin, msg: "Только латиница" },
  ],
  passportNumberEng: [
    { validate: validators.required, msg: "Обязательное поле" },
  ],
  passportCountry: [
    { validate: validators.required, msg: "Обязательное поле" },
  ],
  passportType: [{ validate: validators.required, msg: "Обязательное поле" }],
  oldFirstName: [{ validate: validators.isCyrillic, msg: "Только кириллица" }],
  oldLastName: [{ validate: validators.isCyrillic, msg: "Только кириллица" }],
};

const changeNameTypes = {
  NO: "no",
  YES: "yes",
};

const genderTypes = {
  MALE: "male",
  FEMALE: "female",
};

const isChangeNameOptions = [
  {
    id: "no",
    title: "Нет",
  },
  {
    id: "yes",
    title: "Да",
  },
];

const genderOptions = [
  {
    id: "male",
    title: "Мужской",
  },
  {
    id: "female",
    title: "Женский",
  },
];

export default {
  components: {
    EpInput,
    EpOptions,
    EpSelect,
  },
  data() {
    return {
      isLoading: false,
      formData: {
        lastName: "",
        firstName: "",
        middleName: "",
        birthday: "",
        email: "",
        gender: genderOptions[0],
        changeName: null,
        citizenship: null,
        passportSeria: "",
        passportNumber: "",
        passportNumberEng: "",
        passportDate: "",
        lastNameEng: "",
        firstNameEng: "",
        passportCountry: null,
        passportType: null,
        oldFirstName: "",
        oldLastName: "",
      },
      formErrors: {},
      citizenshipOptions: [],
      isChangeNameOptions,
      genderOptions,
      passportTypesOptions: passportTypesData,
      countryOptions: citizenshipsData.map((t) => ({
        id: t.id,
        title: t.nationality,
      })),

      genderTypes,
      changeNameTypes,
    };
  },
  watch: {
    "formData.citizenship"() {
      Object.assign(this.formData, {
        passportSeria: "",
        passportNumber: "",
        passportDate: "",
        lastNameEng: "",
        firstNameEng: "",
        passportNumberEng: "",
        passportCountry: null,
        passportType: null,
      });
    },
    "formData.changeName"(newVal) {
      if (newVal.id === changeNameTypes.NO)
        Object.assign(this.formData, {
          oldFirstName: "",
          oldLastName: "",
        });
    },
  },
  computed: {
    isShowChangedNamesFields() {
      const changeName = this.formData.changeName;

      return changeName && changeName.id === this.changeNameTypes.YES;
    },
    isRussiaCitizen() {
      return this.formData.citizenship && this.formData.citizenship.id === 8604;
    },
  },
  mounted() {
    this.getCitizenships();
  },
  methods: {
    getCitizenships(filter) {
      let data = citizenshipsData;

      if (filter)
        data = citizenshipsData.filter((t) => t.nationality.startsWith(filter));

      this.citizenshipOptions = data.map((t) => ({
        id: t.id,
        title: t.nationality,
      }));
    },
    resetErrors() {
      this.formErrors = {};
    },
    validateField(fieldname) {
      for (const validator of validateScheme[fieldname]) {
        const isValid = validator.validate(this.formData[fieldname]);

        if (!isValid) {
          this.$set(this.formErrors, fieldname, validator.msg);
          break;
        }
        this.$delete(this.formErrors, fieldname);
      }
    },
    validateForm() {
      this.resetErrors();

      [
        "lastName",
        "firstName",
        "middleName",
        "birthday",
        "email",
        "citizenship",
      ].forEach(this.validateField);

      if (this.formData.citizenship && this.isRussiaCitizen)
        ["passportSeria", "passportNumber", "passportDate"].forEach(
          this.validateField
        );

      if (this.formData.citizenship && !this.isRussiaCitizen)
        [
          "lastNameEng",
          "firstNameEng",
          "passportNumberEng",
          "passportCountry",
          "passportType",
        ].forEach(this.validateField);

      if (
        !!this.formData.changeName &&
        this.formData.changeName.id === changeNameTypes.YES
      ) {
        ["oldFirstName", "oldLastName"].forEach(this.validateField);
      }
    },

    getFormValues() {
      const values = {};

      Object.keys(this.formData).forEach((key) => {
        if (!this.formData[key]) return;

        if (typeof this.formData[key] === "object")
          values[key] = this.formData[key].id;
        else values[key] = this.formData[key];
      });

      return values;
    },

    createUser(data) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ status: 200, data: { ...data } });
        }, 1000);
      });
    },

    fillForm() {
      Object.assign(this.formData, {
        lastName: "Павлов",
        firstName: "Эдуард",
        middleName: "Эдуардович",
        birthday: "19.11.1998",
        email: "eduardpawlow@gmail.com",
      });
    },

    // Events
    onSelectCitizenshipFilter: debounce(function (filter) {
      this.getCitizenships(filter);
    }, 1000),
    async onSubmitForm() {
      this.validateForm();

      if (Object.keys(this.formErrors).length) return;

      const data = this.getFormValues();

      this.isLoading = true;
      try {
        const response = await this.createUser(data);
        console.log(response.data);
        window.alert("Форма успешно отправлена!");
      } catch (error) {
        window.alert("Ошибка отправки форма!");
      }
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.form {
}

.form__title {
  font-size: 24px;
}

.form__title:not(:first-child) {
  margin-top: 40px;
}

.form__submit {
  display: block;
  margin-top: 60px;
  margin-left: auto;
}

.form__hr {
  height: 1px;
  margin: 30px 0;
  background: #2c3e50;
}

.form__row {
  display: flex;
  justify-content: space-between;
}

.form__row:not(:first-child) {
  margin-top: 30px;
}

.form__row > *:not(:last-child) {
  margin-right: 20px;
}

.form__col {
  width: 100%;
}

.form__col-2 {
  width: 50%;
}

.form__col-3 {
  width: 33%;
}

.form__col-4 {
  width: 25%;
}
</style>
