<!--
 * @Descripttion: 数据统计
 * @Author: Hades
 * @Date: 2021-09-02 20:49:03
-->

<template>
  <el-row :gutter="16" class="analysis-amount">
    <el-col :span="6">
      <el-card class="hades-card">
        <template #header>
          <div class="card-header">
            <span class="title">{{ $t('analysis.visitsNumber') }}</span>
            <div class="date moon">{{ $t('analysis.moon') }}</div>
          </div>
        </template>

        <div class="single">
          <CountTo
            :startVal="0"
            :endVal="1000"
            prefix="$"
            :duration="500"
            style="font-size: 22px"
          />
          <svg-icon name="visit-count" size="40" />
        </div>
        <div class="all">
          <div>{{ $t('analysis.totalVisitsNumber') }}</div>
          <CountTo :startVal="0" :endVal="1000" prefix="$" :duration="500" />
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="hades-card">
        <template #header>
          <div class="card-header">
            <span class="title">{{ $t('analysis.turnover') }}</span>
            <div class="date moon1">{{ $t('analysis.moon') }}</div>
          </div>
        </template>
        <div class="single">
          <CountTo
            :startVal="0"
            :endVal="1000"
            prefix="$"
            :duration="500"
            style="font-size: 22px"
          />
          <svg-icon name="total-sales" size="40" />
        </div>
        <div class="all">
          <div>{{ $t('analysis.totalTurnover') }}</div>
          <CountTo :startVal="0" :endVal="1000" prefix="$" :duration="500" />
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="hades-card">
        <template #header>
          <div class="card-header">
            <span class="title">{{ $t('analysis.downloads') }}</span>
            <div class="date week">{{ $t('analysis.week') }}</div>
          </div>
        </template>
        <div class="single">
          <CountTo
            :startVal="0"
            :endVal="1000"
            :duration="500"
            prefix="$"
            style="font-size: 22px"
          />
          <svg-icon name="download-count" size="40" />
        </div>
        <div class="all">
          <div>{{ $t('analysis.totalDownloads') }}</div>
          <CountTo :startVal="0" :endVal="1000" prefix="$" :duration="500" />
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="hades-card">
        <template #header>
          <div class="card-header">
            <span class="title">{{ $t('analysis.transactions') }}</span>
            <div class="date year">{{ $t('analysis.year') }}</div>
          </div>
        </template>
        <div class="single">
          <CountTo
            :startVal="0"
            :endVal="1000"
            :duration="500"
            prefix="$"
            style="font-size: 22px"
          ></CountTo>
          <svg-icon name="transaction" size="40" />
        </div>
        <div class="all">
          <div>{{ $t('analysis.totalTransactions') }}</div>
          <CountTo :startVal="0" :endVal="1000" prefix="$" :duration="500" />
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { CountTo } from 'vue3-count-to'
</script>

<style lang="scss" scoped>
.analysis-amount {
  font-size: 14px;
  .date {
    border: 1px solid #666;
    padding: 0 7px;
    border-radius: 3px;
  }
  .moon {
    color: #389e0d;
    background: #f6ffed;
    border-color: #b7eb8f;
  }
  .moon1 {
    color: #096dd9;
    background: #e6f7ff;
    border-color: #91d5ff;
  }
  .week {
    color: #d46b08;
    background: #fff7e6;
    border-color: #ffd591;
  }
  .year {
    color: #531dab;
    background: #f9f0ff;
    border-color: #d3adf7;
  }
  .single {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
  }
  .all {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
  }
  .amount-svg {
    width: 40px !important;
    height: 40px !important;
  }
}
</style>
