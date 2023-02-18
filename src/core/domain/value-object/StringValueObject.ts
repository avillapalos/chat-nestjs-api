import { ValueObject } from './value-object'

export interface StringPropsData {
  value: string
}

export abstract class StringValueObject extends ValueObject<StringPropsData> {
  value: string

  constructor(props: StringPropsData) {
    super(props)

    this.value = props.value
  }
}
