// schemas/bookingType.ts
import {defineType, defineField} from 'sanity'

export const bookingType = defineType({
  name: 'booking',
  title: 'Бронирование',
  type: 'document',
  fields: [
    defineField({
      name: 'user_name',
      title: 'Имя гостя',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).error('Имя обязательно'),
    }),
    defineField({
      name: 'user_phone',
      title: 'Телефон для связи',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .regex(/^\+?[0-9\s\-]{7,15}$/, {
            name: 'phone',
            invert: false,
          })
          .error('Введите валидный номер'),
    }),
    defineField({
      name: 'rent_from',
      title: 'Дата заезда',
      type: 'date',
      options: {dateFormat: 'YYYY-MM-DD'},
      validation: (Rule) => Rule.required().error('Дата заезда обязательна'),
    }),
    defineField({
      name: 'rent_to',
      title: 'Дата выезда',
      type: 'date',
      options: {dateFormat: 'YYYY-MM-DD'},
      validation: (Rule) => Rule.required().error('Дата выезда обязательна'),
    }),
    defineField({
      name: 'rent_price',
      title: 'Суммарная стоимость (грн)',
      type: 'number',
      validation: (Rule) =>
        Rule.required().precision(2).positive().error('Цена должна быть положительной'),
    }),
    defineField({
      name: 'room',
      title: 'Номер',
      type: 'reference',
      to: [{type: 'room'}],
      validation: (Rule) => Rule.required().error('Нужно выбрать номер'),
    }),
    defineField({
      name: 'people_count',
      title: 'Количество гостей',
      type: 'number',
      validation: (Rule) =>
        Rule.required().integer().positive().error('Укажите целое положительное число'),
    }),
    defineField({
      name: 'child_count',
      title: 'Количество детей',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(0).error('Укажите 0 или больше'),
    }),
    defineField({
      name: 'status',
      title: 'Статус бронирования',
      type: 'string',
      options: {
        list: [
          {title: 'На модерации', value: 'pending'},
          {title: 'Отменено', value: 'cancelled'},
          {title: 'Подтверждено', value: 'confirmed'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required().error('Статус обязателен'),
    }),
  ],
})
