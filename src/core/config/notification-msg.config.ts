export const NOTIFICATION_MSG = {
  cashDeposit: {
    title: 'Acreditación de dinero',
    body: 'Tu dinero ya está acreditado, estás listo para operar'
  },
  dayOff: {
    title: 'Dia Feriado',
    body: (date: string) => { return `Recordá que el ${date} es feriado y por lo tanto no habrá mercado` }
  },
  userHavePonchoGoal: {
    title: 'Usuarios que posean objetivos poncho',
    body: 'Comenzó un nuevo mes, cumplí con tus objetivos de ahorro para estar más cerca de tus vacaciones'
  }
}
