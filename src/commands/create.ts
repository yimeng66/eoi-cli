import inquirer from 'inquirer';
import { resolve } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

import { bigCamelize, logger } from '../utils';

const typeChoices = [
  {
    name: '页面',
    value: 'page',
  },
  {
    name: '组件',
    value: 'component',
  },
];
const pageTemplate = `\
<template>
  <eoi-page class="$name"></eoi-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: '$name',
  steup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.$name {

}
</style>`;
const compTemplate = `\
<template>
  <div class="$name"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import props from './props';

export default defineComponent({
  name: '$name',
  props,
  steup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.$name {

}
</style>`;
const propsTemplate = `\
import { PropType } from 'vue';

export default {};
`;
const indexTemplate = `\
import type { App } from 'vue';

import $bigCamelizeName from './$name';

export * from './type';

$bigCamelizeName.install = function(app: App) {
  app.component($bigCamelizeName.name || '$name', $bigCamelizeName)
}

export default $bigCamelizeName
`;

export async function create() {
  const config = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: '选择创建类型？',
      choices: typeChoices,
    },
    {
      type: 'input',
      name: 'name',
      message(currentAnswer: Record<string, any>) {
        return `请输入${
          typeChoices.find((x) => x.value === currentAnswer.type)?.name
        }名称`;
      },
      validate(name: string) {
        return /^[a-z][a-z0-9]+[-]?[a-z0-9]+$/.test(name) || '名称格式为x或x-x';
      },
    },
  ]);

  const { type, name } = config;
  const cwd = process.cwd();
  const dir = resolve(cwd, `./${config.name}`);

  if (existsSync(dir)) {
    logger.error('目录已存在');
    return;
  }

  const isComponent = type === 'component';
  const template = isComponent ? compTemplate : pageTemplate;

  mkdirSync(dir);
  writeFileSync(resolve(dir, `${name}.vue`), template.replace(/\$name/g, name));

  if (isComponent) {
    writeFileSync(resolve(dir, 'props.ts'), propsTemplate);
    writeFileSync(resolve(dir, 'type.ts'), '');
    writeFileSync(
      resolve(dir, 'index.ts'),
      indexTemplate.replace(/(\$name)|(\$bigCamelizeName)/g, (_, $1, $2) =>
        $2 ? bigCamelize(name) : name
      )
    );
  }

  logger.success(`创建${name}成功`);
}
