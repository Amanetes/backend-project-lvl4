// @ts-check

export default {
  translation: {
    appName: 'Менеджер задач',
    flash: {
      session: {
        create: {
          success: 'Вы успешно вошли в систему',
          error: 'Неправильно указаны почта или пароль',
        },
        delete: {
          success: 'Вы вышли из системы',
        },
      },
      users: {
        create: {
          error: 'Не удалось зарегистрировать',
          success: 'Пользователь успешно зарегистрирован',
        },
        update: {
          error: 'Вы не можете редактировать или удалять другого пользователя',
          success: 'Пользователь успешно изменен',
          failure: 'Не удалось изменить пользователя',
        },
        delete: {
          error: 'Вы не можете редактировать или удалять другого пользователя',
          success: 'Пользователь успешно удален',
          failure: 'Не удалось удалить пользователя',
        },
      },
      statuses: {
        create: {
          success: 'Статус успешно создан',
          error: 'Не удалось создать статус',
        },
        update: {
          success: 'Статус успешно изменен',
          error: 'Не удалось изменить статус',
        },
        delete: {
          success: 'Статус успешно удален',
          error: 'Не удалось удалить статус',
        },
      },
      authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
    },
    layouts: {
      application: {
        users: 'Пользователи',
        statuses: 'Статусы',
        labels: 'Метки',
        tasks: 'Задачи',
        signIn: 'Вход',
        signUp: 'Регистрация',
        signOut: 'Выход',
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Вход',
          submit: 'Войти',
        },
      },
      placeholders: {
        firstName: 'Имя',
        lastName: 'Фамилия',
        email: 'Email',
        password: 'Пароль',
        name: 'Наименование',
      },
      users: {
        id: 'ID',
        fullName: 'Полное имя',
        email: 'Email',
        createdAt: 'Дата создания',
        options: 'Действия',
        new: {
          submit: 'Сохранить',
          signUp: 'Регистрация',
        },
        update: {
          submit: 'Изменить',
          title: 'Изменение пользователя',
        },
        delete: {
          submit: 'Удалить',
        },
      },
      statuses: {
        id: 'ID',
        name: 'Наименование',
        createdAt: 'Дата создания',
        options: 'Действия',
        new: {
          create: 'Создать статус',
          title: 'Создание статуса',
          submit: 'Создать',
        },
        update: {
          submit: 'Изменить',
          title: 'Изменение статуса',
        },
        delete: {
          submit: 'Удалить',
        },
      },
      welcome: {
        index: {
          hello: 'Менеджер задач',
          description: 'Учебный проект по профессии Node.js разработчик',
          more: 'Узнать Больше',
        },
      },
    },
  },
};
