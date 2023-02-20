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
      return value.props[prop]
    },
    from: (value: T): ValueObject<T> => {
      return new ValueObject({ value })
    },
  }
}
