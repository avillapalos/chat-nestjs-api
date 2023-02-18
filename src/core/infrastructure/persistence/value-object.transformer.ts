import { NewableClass } from '../../domain/newable.class'
import {
  ValueObject,
  ValueObjectProps,
} from '../../domain/value-object/value-object'

export const ValueObjectTransformer = <T extends ValueObjectProps>(
  ValueObject: NewableClass<ValueObject<any>>,
  prop = 'value',
) => {
  return {
    to: (value: ValueObject<ValueObjectProps>): any => {
      // console.log(value.props[prop])
      return value.props[prop]
    },
    from: (value: T): ValueObject<T> => {
      // console.log(value)
      // console.log(new ValueObject({ value }))
      return new ValueObject({ value })
    },
  }
}
