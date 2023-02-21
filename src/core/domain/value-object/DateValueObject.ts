import { ValueObject } from './value-object'

export interface DatePropsData {
  value: Date
}

export abstract class DateValueObject extends ValueObject<DatePropsData> {
  value: Date

  constructor(props: DatePropsData) {
    super(props)

    this.value = props.value
  }
}
