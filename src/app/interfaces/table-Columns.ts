export interface TableColumn<T> {
  label: string
  def: string
  content: (row: T) =>  string | null | undefined //puede devolver un  valor nulo o indefinido, T para recibir de varios tipos de arreglos
}
