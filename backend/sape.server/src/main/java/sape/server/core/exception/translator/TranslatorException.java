package sape.server.core.exception.translator;

import sape.server.core.exception.ValidationException;

/**
 * Tradutor padr�o das exce��es geradas na aplica��o.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
public class TranslatorException {

    public static void translateToCRUDException(Exception e) throws ValidationException {
        throw new ValidationException(e);
    }
}