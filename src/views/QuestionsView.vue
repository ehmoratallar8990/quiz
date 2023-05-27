<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="questions-view">
    <div class="header">
      <h1>Selecciona La pregunta</h1>
      <p>Preguntas disponibles: {{ validQuestions.length }}</p>
      <!-- <pre>{{ questions }}</pre> -->
      <!-- <pre>{{ validQuestions }}</pre> -->
      <!-- <pre>inputValue: {{ inputValue }}</pre> -->
    </div>
    <div class="question-select">
      <label htmlFor="question-number">Pregunta:</label>
      <input
        v-model="inputValue"
        id="question-number" :readonly="readonly"
        type="number" min="1" :max="validQuestions.length">
      <div class="controls">
        <button @click="clear" type="reset">Limpiar</button>
        <button @click="select" type="submit">Seleccionar</button>
      </div>
    </div>
    <div v-if="selectedQuestion" class="question-container">
      <!-- <pre>{{ selectedQuestion }}</pre> -->
      <!-- <pre>{{ selectedAnswer }}</pre> -->
      <h1>{{ selectedQuestion.question }}</h1>
      <div class="answers-container" :class="{'selected': selectedAnswer != null }">
        <div class="answer"
            v-for="(answer, index) in selectedQuestion.answers"
            :key="'answer-' + index"
            :class="{
              'selected': selectedAnswer === index,
              'correct': answer.correct,
              'incorrect': !answer.correct
              }"
            @click="selectAnswer(index)">
          {{ answer.answer }}
        </div>
      </div>
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
      inputValue: 1,
      readonly: false,
      selectedAnswer: null,
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
      // this.inputValue = null;
      this.selected = null;
      this.readonly = false;
      this.selectedAnswer = null;
    },
    select() {
      const { inputValue, validQuestions } = this;
      if (inputValue < 1 || inputValue > validQuestions.length) {
        this.clear();
        return;
      }
      this.selected = inputValue;
      // this.readonly = true;
    },
    selectAnswer(index) {
      this.selectedAnswer = index;
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
  .question-container {
    .answers-container {
      .answer {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        text-align: center;
        font-weight: bold;
        font-size: 20px;
        padding: 25px 25px;
        border-radius: 5px;
        border: 2px solid rgba(black, 0.4);
        background-color: rgba(gray, 0.1);
        margin: 25px 0;
        &:hover {
          cursor: pointer;
        }
      }

      &.selected {
        .answer {
          &.selected {
            background-color: rgba(orange, 0.8);
            background-color: rgba(orange, 0.4);
          }
          &.correct {
            background-color: rgba(green, 0.8);
            background-color: rgba(green, 0.4);
          }
        }
      }
    }
  }
}
</style>
