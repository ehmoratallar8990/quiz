<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="questions-view">
    <div class="header">
      <h1>Selecciona La pregunta</h1>
      <p>Preguntas disponibles: {{ validQuestions.length }}</p>
      <!-- <pre>{{ questions }}</pre> -->
      <!-- <pre>{{ validQuestions }}</pre> -->
      <pre>inputValue: {{ inputValue }}</pre>
    </div>
    <div class="question-select">
      <label htmlFor="question-number">Pregunta:</label>
      <input
        v-model="inputValue"
        id="question-number" type="number" min="1" :max="validQuestions.length">
      <div class="controls">
        <button @click="clear" type="reset">Limpiar</button>
        <button @click="select" type="submit">Seleccionar</button>
      </div>
    </div>
    <div class="question">
      <pre>{{ selectedQuestion }}</pre>
    </div>
  </div>

</template>

<script>
import questionDefinitions from '@/questions/questions.json';

export default {
  data() {
    return {
      questions: questionDefinitions?.questions,
      selected: null,
      inputValue: null,
    };
  },
  computed: {
    validQuestions() {
      if (!Array.isArray(this.questions)) {
        return [];
      }
      const filtered = this.questions.filter((question) => question.enabled);
      return filtered.map((question, index) => {
        const q = structuredClone(question);
        q.id = index + 1;
        return q;
      });
    },
    selectedQuestion() {
      const { validQuestions, selected } = this;
      if (selected == null) {
        return null;
      }
      const question = validQuestions[selected - 1];
      return question;
    },
  },
  methods: {
    clear() {
      this.inputValue = null;
      this.selected = null;
    },
    select() {
      const { inputValue, validQuestions } = this;
      if (inputValue < 1 || inputValue > validQuestions.length) {
        this.clear();
        return;
      }
      this.selected = inputValue;
    },
  },
};
</script>
<style lang="scss">
.questions-view {
  $grey: #2c3e50;

  label {
    display: block;
  }
  input {
    height: 50px;
    width: 150px;
    color: $grey;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    font-weight: bold;
    font-size: 30px;
  }
  button {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    padding: 15px 25px;
    &:hover {
      cursor: pointer;
    }
  }

  .question-select {
    .controls {
      display: flex;
      gap: 15px;
      margin: 15px 0;
      justify-content: center;
    }
  }
}
</style>
