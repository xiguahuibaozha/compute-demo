<template>
  <view class="content">
    <view class="show-box">
      <view class="formula">{{ formula.join("") }}{{ num.join("") }}</view>
      <view class="result">= {{ result }}</view>
    </view>
    <view class="btn-box">
      <view class="btn-box-item" :class="{
        btns4x4: currentBtnx === 'btns4x4',
        btns5x5: currentBtnx === 'btns5x5',
        disabled: t.disabled
      }" v-for="t in btns" :key="t"  :style="{
        color: t.color,
        backgroundColor: t.backgroundColor
      }" @click="onClick(t.text)">{{ t.text }}</view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { compute, calculate } from 'luowl-calc'

const btns4x4 = ['C','D','%','÷',7,8,9,'×',4,5,6,'-',1,2,3,'+','SW',0,'.','=']

const btns5x5 = ['x^y','C','D','%','÷','lg',7,8,9,'×','ln',4,5,6,'-','√x',1,2,3,'+','x/y','SW',0,'.','=']

const funs = ['x^y', 'lg', 'ln', '√x', 'x/y']

const currentBtnx = ref('btns4x4')

const formatBtns = (btns) => {
  return btns.map(i => {
    const o = {
      text: i,
      color: 'black',
      backgroundColor: '#fbfbfb'
    } 
    if(isNaN(i)) {
      o.color = '#fb7434'
    }
    
    if(i === '.'){
      o.color = 'black'
    }
    
    if(i === '='){
      o.color = 'white'
      o.backgroundColor = '#fb7434'
    }
    
    if(i === 'SW'){
      o.disabled = true
    }
    
    return o
  });
}

const btns = ref(formatBtns(btns4x4))

const result = ref('')

const formula = ref([])

let num = ref([])

// 最后节点是否为小数
const endWithFloat = () => {
  if(!isNaN(formula.value.at(-1))){
    return formula.value.at(-1).indexOf('.') === -1
  }
  return false
}

// 最后节点是否为num
const endWithNumber = () => {
  return !isNaN(formula.value.at(-1))
}

const onClick = (t) => {
  if(isNaN(t)){
    if(funs.includes(t)){
      switch (t) {
        case 'x^y':
          if(num.value.length){
            num.value.push('^')
          }else {
            num.value.push('1')
            num.value.push('^')
          }
          break;
        case 'x/y':
          if(num.value.length){
            num.value.push('/')
          }else {
            num.value.push('1')
            num.value.push('/')
          }
          break;
        default:
          num.value.push(t)
      }
      return null;
    }
    
    switch (t) {
      case '-':
        if(!num.value.length){
          num.value.push('-')
        }
      case 'SW':
        // if(currentBtnx.value === 'btns5x5'){
        //   currentBtnx.value = 'btns4x4'
        //   btns.value = formatBtns(btns4x4)
        // }else if(currentBtnx.value === 'btns4x4'){
        //   currentBtnx.value = 'btns5x5'
        //   btns.value = formatBtns(btns5x5)
        // }
        break;
      case '=':
        if(num.value.length){
          formula.value.push(num.value.join(''))
          num.value = []
        }
        result.value = calculate(formula.value.filter(item => isNaN(item)).map(item => {
          if(item === '×'){
            return '*'
          }else if(item === '÷'){
            return '/'
          }
          return item
        }),...formula.value.filter(item => !isNaN(item)))
        
        break;
      case 'C':
        formula.value = []
        num.value = []
        result.value = ''
        break;
      case '.':
        if(!num.value.includes('.') && (num.value.length || endWithFloat())){
          num.value.push(t)
        }
        break;
      case 'D':
        if(num.value.length){
          num.value.pop()
        }else if(formula.value.length){
          const lastFormula = formula.value[formula.value.length - 1]
          formula.value[formula.value.length - 1] = lastFormula.substring(0, lastFormula.length - 1)
          if(!formula.value[formula.value.length - 1].length){
            formula.value.pop()
          }
        }
        break;
      case '%':
        if(num.value.length){
          num.value = String(compute(parseFloat(num.value.join('')), 100, '/')).split('')
        }else if(endWithNumber()){
          formula.value[formula.value.length - 1] = String(compute(formula.value[formula.value.length - 1], 100, '/'))
        }
        break;
      default:
        if(num.value.length){
          if(num.value.join('').startsWith('.')){
            formula.value.push(num.value.join(''))
            formula.value.push(t)
          }else if(!isNaN(parseFloat(num.value.join('')))){
            formula.value.push(String(parseFloat(num.value.join(''))))
            formula.value.push(t)
          }
          num.value = []
        }else if(endWithNumber()){
          formula.value[formula.value.length - 1] = String(parseFloat(formula.value[formula.value.length - 1]))
          formula.value.push(t)
        }
    }
  }else {
    num.value.push(t)
  }
}
</script>

<style scoped lang="scss">
.content{
  height: calc(100vh - var(--status-bar-height));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .show-box{
    height: 40%;
    padding: 50rpx 20rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    text-align: right;
    letter-spacing: 2rpx;
    
    .formula{
      width: 100%;
      bottom: 0px;
      font-size: 80rpx;
      word-wrap:break-word;
      word-break:normal; 
    }
    
    .result{
      margin-top: 20rpx;
      color: #5e5e5e;
    }
  }
  .btn-box{
    height: 60%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

    &-item{
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: 40rpx;
      font-weight: bold;
    }
    
    .btns4x4{
      width: 22%;
      height: 16%;
    }
    
    .btns5x5{
      width: 18%;
      height: 16%;
    }
    
    .disabled{
      background-color: gray !important;
      color: white !important;
    }
    
    &-item:active {
      transform: scale(0.9);
    }
  }
}

</style>