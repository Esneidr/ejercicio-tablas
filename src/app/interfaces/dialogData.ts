export interface dialogData {
  type: 'warning' | 'success' | 'error'
  title: string
  message: string
  buttons?:{
    primary:{
      show: boolean
      label: string
    }
    secondary?:{
      show: boolean
      label: string
    }
  }
}
