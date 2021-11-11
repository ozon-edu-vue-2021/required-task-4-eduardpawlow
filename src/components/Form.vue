<template>
  <div class="form">
    <h3 class="form__title">Личные данные</h3>
    <div class="form__row">
      <div class="form__col-3">
        <EpInput label="Фамилия" v-model="formData.lastName" />
      </div>
      <div class="form__col-3">
        <EpInput label="Имя" v-model="formData.fistName" />
      </div>
      <div class="form__col-3">
        <EpInput label="Отчество" v-model="formData.middleName" />
      </div>
    </div>

    <div class="form__row">
      <div class="form__col-2">
        <EpInput
          label="Дата рождения"
          placeholder="дд.мм.гггг"
          v-model="formData.birthday"
        />
      </div>
    </div>

    <div class="form__row">
      <div class="form__col">
        <EpInput label="E-mail" v-model="formData.email" />
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
          />
        </div>
        <div class="form__col-4">
          <EpInput
            label="Номер паспорта"
            key="passportNumber"
            v-model="formData.passportNumber"
          />
        </div>
        <div class="form__col-2">
          <EpInput
            label="Дата выдачи"
            placeholder="дд.мм.гггг"
            key="passportDate"
            v-model="formData.passportDate"
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
            />
          </div>
          <div class="form__col-2">
            <EpInput
              label="Имя на латинице"
              key="firstNameEng"
              v-model="formData.firstNameEng"
            />
          </div>
        </div>

        <div class="form__row">
          <div class="form__col-4">
            <EpInput
              label="Номер паспорта"
              key="passportNumber"
              v-model="formData.passportNumber"
            />
          </div>
          <div class="form__col-4">
            <EpSelect
              label="Страна выдачи"
              key="passportCountry"
              :options="countryOptions"
              v-model="formData.passportCountry"
            />
          </div>
          <div class="form__col-2">
            <EpSelect
              label="Тип паспорта"
              key="passportType"
              titleKey="type"
              :options="passportTypesOptions"
              v-model="formData.passportType"
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
          <EpInput label="Предыдущая фамилия" v-model="test" />
        </div>
        <div class="form__col-2">
          <EpInput label="Предыдущее имя" v-model="test" />
        </div>
      </div>
    </template>

    <button
      class="btn btn--primary form__submit"
      type="submit"
      @click="onSubmitForm"
    >
      Отправить
    </button>
  </div>
</template>

<script>
import EpInput from "@/components/inputs/EpInput";
import EpOptions from "@/components/inputs/EpOptions";
import EpSelect from "@/components/inputs/EpSelect";

import { debounce } from "@/assets/js/debounce";

import citizenshipsData from "@/assets/data/citizenships.json";
import passportTypesData from "@/assets/data/passport-types.json";

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
      test: "",
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
        passportDate: "",
        lastNameEng: "",
        firstNameEng: "",
        passportCountry: null,
        passportType: null,
      },
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
        passportCountry: null,
        passportType: null,
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

    // Events
    onSelectCitizenshipFilter: debounce(function (filter) {
      this.getCitizenships(filter);
    }, 1000),
    onSubmitForm() {
      console.log(JSON.stringify(this.formData));
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
